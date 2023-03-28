const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');


const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please given maximum length of name"]
    },
    email:{
        type:String,
        unique:true,
        lowercase:true,
        required:true,
        validate:[validator.isEmail,'please insert correct email adderss']
    },
    image:{
        type:String,
        default:'default.jpg'
    },
    password:{
        type:String,
        unique:true,
        required:true,
        minilength:5,
        select:false
    },
    confirmPassword:{
        type:String,
        required:true,
        validate:{
            validator:function(el){
                return el === this.password;
            },
            message:'please insert same  correct password'
        }
    },
    active:{
        type:Boolean,
        select:false,
        default:true
    },
    role:{
        type:String,
        enum:['admin','user'],
        default:'user'         
    },
    passwordChangedAt : Date,
   passwordResetToken : String,
   passwordResetExpiers : Date,
   
    
});


userSchema.pre('save',function(next){
    console.log('save succesfully');
    next();
})

userSchema.pre('save',async function(next){
    // password is actually  modified 
    if(!this.isModified('password')) return next();
   //password is bcrypt     
    this.password = await bcrypt.hash(this.password,12);
    // confirm password filed delete
    this.confirmPassword = undefined;
    next();
});

userSchema.pre('save',function(next){
    
    if(this.isModified('password')||this.isNew) return next();

    this.passwordChangedAt = Date.now()-1000;

    next();
})

userSchema.methods.correctPassword = async function(candiatePassword,userPassword){
    return await bcrypt.compare(candiatePassword,userPassword)
};

userSchema.methods.changePassworsAfter = async function(JWTTimpstamp){
    if(this.passwordChangedAt){
       const changedTimpestamp = parseInt(
            this.passwordChangedAt.getTime() / 100000,
         10
        );
        return JWTTimpstamp < changedTimpestamp;
    }
    
   return false;
};



userSchema.methods.changePasswordResetToken = function(){
  const resetToken = crypto.randomBytes(52).toString('hex');


  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex')


  console.log({ resetToken},this.passwordResetToken);


  this.passwordResetExpiers= Date.now() +10 * 60 * 1000;

  return resetToken;
    
}



const User = mongoose.model('User',userSchema);


module.exports = User;

const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../Model/userModel');
const sendEmail = require('../utils/email');
const catchAsync = require('../utils/catchAsync');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });



exports.signup = catchAsync(async(req,res,next)=>{
 const newUser = await User.create(req.body);
 const token=jwt.sign({ id: newUser._id },process.env.JWT_SECERTE,{
    expiresIn:process.env.JWT_EXPIERS_IN
});
 
 res.status(201).json({
    status:'success',
    token,
    data:{
       users: newUser
    }
 })

 
});

exports.login = catchAsync (async(req,res,next)=>{
 const{email,password} = req.body;
 
 if(!email||!password) {
    return next(new Error('please provided email and password',400))
 };


 const user = await User.findOne({email}).select('+password');


 if(!user ||!(await user.correctPassword(password,user.password))) {
    return next();
 }
 
 const token=jwt.sign({ id: user._id },process.env.JWT_SECERTE,{
    expiresIn:process.env.JWT_EXPIERS_IN
});

 res.status(201).json({
    status:'success',
    token,
    data:{
       users:user
    }
  })
});



exports.protected = catchAsync(async(req,res,next)=>{
    let token;
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    } 
  
    if (!token) {
      return next(
        new Error('You are not logged in! Please log in to get access.', 401)
      );
    }


   const decode = await promisify(jwt.verify)(token,process.env.JWT_SECERTE)

   if(!decode){
    return next();
   }
 
    const currentUser = await User.findById(decode.id)

    if(!currentUser){
        return next(new Error('The user belonging to this token does no longer exist',400));
    }

    
   
   req.user = currentUser;
   next();
})




exports.forgotPassword = catchAsync(async(req,res,next)=>{
 // checked email for req.body
  const user = await User.findOne({email:req.body.email});

  if(!user){
   return next(new Error('please check you email address',401));
  }


  const resetToken = user.changePasswordResetToken();
  await user.save({ validateBeforeSave:false });

 const resetURL = `${req.protocol}://${req.get('host')}/v1/api/users/resetPassword/${resetToken}`;
 const message= `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`
  
  try{
   // sendmail
    await sendEmail({
         email:user.email,
         subject:'forgot password for 10 minutes and expires the link',
         message
      });
   // responsed   
      res.status(201).json({
         status:'success',
         message:'token is send for email' 
      })


   }catch(err){
     user.passwordResetExpiers =undefined;
     user.passwordResetToken= undefined;
     await user.save({ validateBeforeSave:false });
   }
     
});



exports.resetPassword = catchAsync(async(req,res,next)=>{

   const hasedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');

   const user = await User.findOne({ 
    passwordResetToken: hasedToken,
    passwordResetExpires: {$gt: Date.now()}
   });

   if (!user) {
      return next(new Error('Token is invalid or has expired and any other problem'));
   }

   user.password= req.body.password;
   user.confirmPassword= req.body.confirmPassword;
   user.passwordResetToken= undefined;
   user.passwordResetExpires= undefined;
   await user.save();

   const Signtoken=jwt.sign({ id: user._id },process.env.JWT_SECERTE,{
      expiresIn:process.env.JWT_EXPIERS_IN
   });

   res.status(201).json({
      status:'success',
      Signtoken,
      data:{
         users:user
      } 
   })

});


exports.changedPassword = catchAsync(async(req,res,next)=>{
   const user = await User.findById(req.user.id).select('+password');
   if (!await user.correctPassword(req.body.passwordCurrent, user.password)){
     return next(new Error('your vaild for current password',400))
   };
  
   user.password=req.body.password;
   user.confirmPassword=req.body.confirmPassword;
   await user.save();
   const token=jwt.sign({ id: user._id },process.env.JWT_SECERTE,{
      expiresIn:process.env.JWT_EXPIERS_IN
  });

   res.status(201).json({
      status:'success',
      token,
      data:{
            users:user
      } 
   });
}); 

exports.restricTo = (...roles)=>{
   return(req,res,next)=>{
      if(!roles.includes(req.user.role)){
         return next(new Error('please check your user role',401));
      }
      next();
   }
}




exports.updateProfile = catchAsync(async(req,res,next)=>{


   const user = await User.findByIdAndUpdate(req.user.id,{
      name:req.body.name,
      email:req.body.email
   },{
      new:true,
      runValidators:true
   })
   
   const token=jwt.sign({ id: user._id },process.env.JWT_SECERTE,{
      expiresIn:process.env.JWT_EXPIERS_IN
   });

   res.status(201).json({
      status:'success',
      token,
      data:{
         users:user
      } 
   });


})
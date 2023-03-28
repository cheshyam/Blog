const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
    user_id:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:[true,'please check your userId']
    },
    blog_id:{
        type:mongoose.Schema.ObjectId,
        ref:'Blog',
        required:[true,'please check you blogId']
    },
    user_image:{
        type:String,
        default:'default.jpeg'

    },
    comment:{
        type:String,
        unique:true,
        required:true,
        minilength:[10,'please enter maximum comment']
    },
    active:{
        type:Boolean,
        select:false,
        default:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

commentSchema.index({ user_id: 1}, { unique: true })


commentSchema.pre('save',function(next){
    console.log('save succesfully');
    next();
})








const Comment = mongoose.model('Comment',commentSchema);


module.exports= Comment
const Blog = require('../Model/blogModel');
const { $where } = require('../Model/commentModel');
const Comment = require('../Model/commentModel');
const catchAsync = require('../utils/catchAsync');

exports.countComment = catchAsync(async(req,res)=>{
   try{ 
    const comment = await Comment.findOne({id:req.params.Blog_id})
    
    
    
    
    res.status(201).json({
        status:'success',
        data:{  
            comment
        }
    }) 
 } catch(err){
    console.log(err);
 }  
})



exports.getAllComment= catchAsync( async(req,res)=>{

const comment = await Comment.find();

    res.status(201).json({
        status:'success',
        results:comment.length,
        data:{
            comments:comment
        }
    })
})

exports.createComment = catchAsync(async(req,res)=>{

const comment = await Comment.create(req.body);


    res.status(201).json({
        status:'success',
        data:{
            comments:comment            
        }
    })
})

exports.updatComment=catchAsync(async(req,res)=>{

const comment = await Comment.findByIdAndUpdate(req.params.id,req.body,{
 new:true,
 runValidators:true
});

    res.status(201).json({
        status:'success',
        data:{
            comments:comment
        }
    })
})

exports.deleteComment= catchAsync(async(req,res)=>{
 
await Comment.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status:'success',
        data:null
    })
});




exports.latestComment = catchAsync(async(req,res,next)=>{
    const latestComments = await Comment.find().sort({ date: -1 }).limit(10);


 
    res.status(201).json({
        status:'success',
        data:{
            latestComments
        }
    })
});




exports.adminAccess = catchAsync(async(req,res,next)=>{


    const comment = await Comment.findById(req.params.id)
    res.status(201).json({
        status:'success',
        message:'aproved a comment',
        data:{
            admin:comment
        }
    })


   
})

const Blog = require('../Model/blogModel');
const Comment  = require('../Model/commentModel');
const catchAsync = require('../utils/catchAsync');
const APIFeatures = require('../utils/apiFeatures');



exports.getAllBlog = catchAsync( async(req,res)=>{

    const features = new APIFeatures(Blog.find(), req.query)
    .filter()
    .paginate();
  const blog = await features.query;

    res.status(201).json({
        status:'success',
        results:blog.length,
        data:{
           blogs:blog
        }
    })
});




exports.getBlog = catchAsync(async(req,res)=>{
    const blog = await Blog.findById(req.params.id).populate('comment')


    res.status(201).json({
        status:'success',
        results:blog.length,
        data:{
           blogs:blog
        }
    })


})

exports.createBlog = catchAsync(async(req,res)=>{
 
  const bloging = await Blog.create(req.body);
  

    res.status(201).json({
        status:'success',
        data:{
            blogs:bloging
        }
    })
})

exports.updatBlog = catchAsync(async(req,res)=>{

const blog = await Blog.findByIdAndUpdate(req.pramas.id,req.body,{
    new:true,
    runValidators:true
})

    res.status(201).json({
        status:'success',
        data:{
            blogs:blog
        }
    })
})

exports.deleteBlog = catchAsync(async(req,res)=>{

await Blog.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status:'success',
        data:null
    })
})

exports.search= catchAsync(async(req,res,next)=>{
    const searching = await Blog.find({
        $or:[
            {
             name:{$regex: req.params.key}
            }
        ]
        
    });
   
 

    res.status(201).json({
        status:'success',
        results:searching.length,
        data:{
            searching
        }
    })
})











    

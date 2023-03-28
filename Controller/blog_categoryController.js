const BlogCategory = require('../Model/blog_CategoryModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllBlogCategory = catchAsync (async(req,res)=>{

   const blogca = await BlogCategory.find();

    res.status(201).json({
        status:'success',
        results:blogca.length,
        data:{
              blogs:blogca
        }
    })
})

exports.createBlogCategory =catchAsync(async(req,res)=>{
  
    const blogCat = await BlogCategory.create(req.body);
    
    res.status(201).json({
        status:'success',
        data:{
           blogs:blogCat
        }
    })
})

exports.updatBlogCategory =catchAsync( async(req,res)=>{

const blogc = await BlogCategory.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runvalidator:true
})

    res.status(201).json({
        status:'success',
        data:{
              blogs:blogc
        }
    })
})

exports.deleteBlogCategory = catchAsync(async(req,res)=>{

const bloga = await BlogCategory.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status:'success',
        data:{
            bloga:null
        }
    })
})

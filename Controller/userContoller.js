const User = require('../Model/userModel');
const catchAsync = require('../utils/catchAsync');

exports.getAllUser = catchAsync(async(req,res)=>{

const user =  await User.find();

    res.status(201).json({
        status:'success',
        results:user.length,
        data:{
            users:user
        }
    })
});

exports.createUser = catchAsync(async(req,res)=>{

const user = await User.create(req.body);

    res.status(201).json({
        status:'success',
        data:{
           users:user
        }
    })
})

exports.updatUser = async(req,res)=>{

const user =await User.findByIdAndUpdate(req.params.id,req.body,{
    new:true,
    runValidators:true
});

    res.status(201).json({
        status:'success',
        data:{
            users:user
        }
    })
}

exports.deleteUser = async(req,res)=>{

 await User.findByIdAndDelete(req.params.id);

    res.status(201).json({
        status:'success',
        data:null
    })
}

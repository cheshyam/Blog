const mongoose = require('mongoose');
const validator = require('validator');



const blogCategorySchema = new mongoose.Schema({
    name:{
        type:String,
        unique:true,
        require:true,
        minilength:[5,'please given the maximum length of name ']
    },
    active:{
        type: Boolean,
        default: true,
    }
});

blogCategorySchema.pre('save',function(next){
    console.log('save succesfully');
    next();
});




const BlogCategory = mongoose.model('BlogCategory',blogCategorySchema)


module.exports = BlogCategory;
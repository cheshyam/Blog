const mongoose = require('mongoose');
const validator = require('validator');
const User = require('./userModel');
const BlogCategory = require('./blog_CategoryModel');


const blogSchema = new mongoose.Schema({
  name:{
    type:String,
    unique:true,
    required:true,
    minilenth:[6,'please enter the maximum length']
  },
  description:{
    type:String,
    required:true
  },
  image:{
    type:String
  },
  active:{
    type:Boolean,
    select:false,
    default:true
  },
  user_id:{
    type:mongoose.Schema.ObjectId,
    ref:'User',
    required:[true,'please belong to field']
  },
  category_id:{
    type:mongoose.Schema.ObjectId,
    ref:'BlogCategory',
    required:[true,'please belong to field']
  },
  comment:{
    type:mongoose.Schema.ObjectId,
    ref:'Comment'
  }

})





const Blog = mongoose.model('Blog',blogSchema)


module.exports = Blog;
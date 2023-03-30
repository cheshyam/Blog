const express = require('express');
const blog_categoryController = require('../Controller/blog_categoryController');
const authController = require('../Controller/authController');

const router = express.Router();

router.route('/')
.get(authController.protected,blog_categoryController.getAllBlogCategory)
.post(blog_categoryController.createBlogCategory);

router.route('/:id')
.patch(blog_categoryController.updatBlogCategory)
.delete(blog_categoryController.deleteBlogCategory);


module.exports=router;


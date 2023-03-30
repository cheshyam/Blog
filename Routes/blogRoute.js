const express = require('express');
const blogController = require('../Controller/blogController');
const authContoller = require('../Controller/authController');

const router = express.Router();

router.post('/search/:key',authContoller.protected,blogController.search);
router.get('/test',authContoller.protected,blogController.countComment);


router.route('/')
.get(authContoller.protected,blogController.getAllBlog)
.post(authContoller.protected,blogController.createBlog);

router.route('/:id')
.patch(authContoller.protected,blogController.updatBlog)
.delete(authContoller.protected,blogController.deleteBlog);

router.get('/:id/comment',authContoller.protected,blogController.getBlog);

module.exports=router;


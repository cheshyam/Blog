const express = require('express');
const commentController = require('../Controller/commentController');
const authContoller = require('../Controller/authController');

const router = express.Router();

router.get('/latestComment',commentController.latestComment);
router.get('/adminAccess/:id',authContoller.protected,authContoller.restricTo('admin'),commentController.adminAccess)

router.route('/')
.get(authContoller.protected,commentController.getAllComment)
.post(authContoller.protected,commentController.createComment);

router.route('/:id')
.patch(authContoller.protected,commentController.updatComment)
.delete(authContoller.protected,commentController.deleteComment);


module.exports=router;


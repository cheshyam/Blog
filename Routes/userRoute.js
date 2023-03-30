const express = require('express');
const userController = require('../Controller/userContoller');
const authController = require('../Controller/authController');
const { Router } = require('express');

const router = express.Router();


router.post('/signup',authController.signup);
router.post('/login',authController.login);
router.post('/forgotpassowrd',authController.forgotPassword);
router.patch('/resetPassword/:token',authController.resetPassword);
router.patch('/changedPassword',authController.protected,authController.changedPassword);
router.patch('/updateProfile',authController.protected,authController.updateProfile);

router.route('/')
.get(userController.getAllUser)
.post(userController.createUser);

router.route('/:id')
.patch(userController.updatUser)
.delete(userController.deleteUser);


module.exports=router;


//import the express module
const express = require('express');
//call the router method from express to create the router
const router = express.Router();
//import the login controller
const loginControllers = require('../controller/login.controller');
//create a route to handle the login request on post
router.post('/api/employee/login',loginControllers.logIn)
//create a route to handle the reset password request on post
router.post('/api/employee/resetpassword',loginControllers.resetPassword)
//create a route to handle the forgot password request on post
router.post('/api/employee/forgot-password',loginControllers.forgotpassword)
//create a route to handle the resetforgot password request on post
router.post('/api/employee/resetforgot-password/:token',loginControllers.resetforgot_password)
//export the router 
module.exports = router;
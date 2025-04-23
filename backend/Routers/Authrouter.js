const route=require('express').Router();
const {signupValidation,loginValidation}=require('../middleware/Authvalidation');
const {signup,login}=require('../controller/Authcontroller');

route.post('/signup',signupValidation,signup);
route.post('/login',loginValidation,login);
module.exports=route;
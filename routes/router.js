const express=require('express');
const route=express.Router()
const services=require('../services/render')
const controller=require('../controller/controller');
const jwt=require('../controller/jwt.js');
const cookieParser = require("cookie-parser");
route.use(cookieParser());

route.get('/',services.homeRoutes);
route.get('/login',services.login);
route.get('/display',jwt.validateToken,services.displayresult);
route.get('/addresult',services.addresult);
route.get('/updateresult',services.updateresult);
route.get('/checkresult',jwt.validateToken,services.checkresult);
route.get('/yourresult',services.yourresult);


//API
route.post('/details',controller.create)
route.get('/details',controller.read)
route.delete('/details/:RollNo',controller.delete)
route.put('/details/:RollNo',controller.edit)
route.get('/details/:RollNo',controller.find)
//route.post('/logincheck',logincontroller.logincheck)
route.post('/login',jwt.logins)

module.exports=route
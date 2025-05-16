const express=require('express');
const routes=express.Router();
const {GetAllUser} = require('../controller/getAllUser.js');

routes.get('/getusers',GetAllUser);

module.exports=routes;
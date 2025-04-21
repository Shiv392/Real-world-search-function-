const express=require('express');
const routes=express.Router();
const {GetAllUser} = require('../controller/getAllUser.js');
const {findUserByKeyword} = require('../controller/getUserBySearch.js');

routes.get('/getusers',GetAllUser);
routes.get('/GetUserBySearch',findUserByKeyword);

module.exports=routes;
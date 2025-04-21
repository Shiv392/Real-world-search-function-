const getUserModel = require('../models/GetData.js');

const GetAllUser=(req,res)=>{
 try{
 const data=getUserModel.GetDataModel();
 if(!data) return res.status(200).json({success:true,message:'No User found'});
 else{
    res.status(200).json({
        success:true,
        user:data
    })
 }
 }
 catch(err){
    return res.status(500).json({success:false,message:'Error'})
 }
}

module.exports={GetAllUser}
const getUserModel = require('../models/GetData.js');

const GetAllUser=async (req,res)=>{
    console.log('req------>',req.query)
    const {limit,offset}=req.query
 try{
 const [data,totalUserCnt]= await Promise.all([ //Promise.all function will let to call two or more async function 
   getUserModel.getAllUser({limit,offset}),getUserModel.getUsersCount()
 ]);

 if(!data){
   return res.status(200).json({success:true,message:'NO Data Found',users:[]});
 }
 else{
   return res.status(200).json({
      success:true,
      message:'Data Fetched Succesfully',
      totalUser : totalUserCnt,
      user:data
   })
 }
 }
 catch(err){
    return res.status(500).json({success:false,message:'Error'})
 }
}

module.exports={GetAllUser}
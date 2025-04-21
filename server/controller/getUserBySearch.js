const UserdataModel=require('../models/GetData.js');

const findUserByKeyword=async(req,res)=>{
    const {keyword,limit,offset}=req.query;
  
    try{
        const data=await UserdataModel.getSearchUser({keyword,limit,offset});
        console.log('data------>',data);
        if(!data){
            return res.status(200).json({success:true,message:'No data found'});
        }
        else{
            return res.status(200).json({success:true,data:data});
        }
    }
    catch(err){
        return res.status(500).json({success:false,message:err})
    }
}

module.exports={findUserByKeyword}
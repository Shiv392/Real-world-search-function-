const dbConnection= require('../db/mysqlConnection.js');

exports.GetDataModel=()=>{
   return new Promise((resolve,reject)=>{
    dbConnection.query(`select * from userdata limit 50 offset 0`,(err,data)=>{
        if(err){
            console.log('data fetch error--------->',err);
            reject(err);
        }
        else{
            console.log('data---------->',data);
            resolve(data);
        }
    })
   }) 
}
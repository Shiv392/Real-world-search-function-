const dbConnection= require('../db/mysqlConnection.js');

exports.GetDataModel=()=>{
    dbConnection.query(`select * from userdata`,(err,data)=>{
        if(err){
            console.log('data fetch error--------->',err);
        }
        else{
            console.log('data---------->',data);
            return data;
        }
    })
    
}
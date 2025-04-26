const dbConnection= require('../db/mysqlConnection.js');

exports.getAllUser=({limit,offset})=>{
   return new Promise((resolve,reject)=>{
    dbConnection.query(`select * from userdata limit ${limit} offset ${offset}`,(err,data)=>{
        if(err){
            console.log('data fetch error--------->',err);
            reject(err);
        }
        else{
            resolve(data);
        }
    })
   }) 
}

//function to get the count of all record present in the table----------------------->
exports.getUsersCount=()=>{
  return new Promise((resolve,reject)=>{
    dbConnection.query(`select count(id) as TotalCount from userdata`,(err,data)=>{
      if(err){
        console.log('error while fetch total user count--------->',err);
        reject(err);
      }
      else{
        console.log('total user count------>',data);
        resolve(data[0].TotalCount);
      }
    })
  })
}

exports.getSearchUser=({keyword,limit,offset})=>{
    return new Promise((resolve, reject) => {
        const searchQuery = `
          SELECT * FROM userdata
          WHERE name LIKE ? OR email LIKE ? OR city LIKE ?
          Limit ?
        `;
    
        const searchTerm = `%${keyword}%`;
        dbConnection.query(
          searchQuery,
          [searchTerm, searchTerm, searchTerm,parseInt(limit)],
          (err, data) => {
            if (err) {
              console.log('Search fetch error--------->', err);
              reject(err);
            } else {
              resolve(data);
            }
          }
        );
      });
}
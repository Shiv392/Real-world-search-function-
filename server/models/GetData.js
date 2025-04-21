const dbConnection= require('../db/mysqlConnection.js');

exports.getAllUser=({limit,offset})=>{
   return new Promise((resolve,reject)=>{
    dbConnection.query(`select * from userdata limit ${limit} offset ${offset}`,(err,data)=>{
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
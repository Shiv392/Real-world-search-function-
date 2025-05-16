const dbConnection = require('../db/mysqlConnection.js');

exports.getAllUser = ({ limit, offset,keyword }) => {
  return new Promise((resolve, reject) => {
    const searchTerm = `%${keyword || ''}%`;
    dbConnection.query(`SELECT COUNT(id) as TotalCount from userdata where name like ? or city like ? or email like ?`,[searchTerm,searchTerm,searchTerm], (err, totalcnt) => {
      if (err) {
        console.log('error while counting record--->');
        return reject(err);
      }

      const TotalCount = totalcnt[0].TotalCount;
      const TotalPages = Math.ceil(TotalCount / limit);
      const Pagelist = Array.from({ length: TotalPages }, (_, i) => i + 1);

      //fetch user data records
      dbConnection.query(`SELECT * FROM userdata where name like ? or city like ? or email like ? limit ${limit} offset ${offset}`,[searchTerm,searchTerm,searchTerm], (err, userdata) => {
        if (err) {
          console.log('error while fetching user data---->', err);
          return reject(err);
        }

        resolve({
          users: userdata,
          totalcnt: TotalCount,
          pagelist: Pagelist
        })
      })
    })
  })
}

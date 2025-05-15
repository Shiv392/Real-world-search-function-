const dbConnection = require('../db/mysqlConnection.js');

exports.getAllUser = ({ limit, offset }) => {
  return new Promise((resolve, reject) => {
    dbConnection.query(`SELECT COUNT(id) as TotalCount from userdata`, (err, totalcnt) => {
      if (err) {
        console.log('error while counting record--->');
        return reject(err);
      }

      const TotalCount = totalcnt[0].TotalCount;
      const TotalPages = Math.ceil(TotalCount / limit);
      const Pagelist = Array.from({ length: TotalPages }, (_, i) => i + 1);

      //fetch user data records
      dbConnection.query(`SELECT * FROM userdata limit ${limit} offset ${offset}`, (err, userdata) => {
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


exports.getSearchUser = ({ keyword, limit, offset }) => {
  return new Promise((resolve, reject) => {
    const searchQuery = `
          SELECT * FROM userdata
          WHERE name LIKE ? OR email LIKE ? OR city LIKE ?
          Limit ?
        `;

    const searchTerm = `%${keyword}%`;
    dbConnection.query(
      searchQuery,
      [searchTerm, searchTerm, searchTerm, parseInt(limit)],
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
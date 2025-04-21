const mysql = require('mysql');

const dbConnection=mysql.createConnection({
    host:'localhost',
    database:'searchfilter',
    user:'root',
    password:'Shiv@3923'
})

module.exports=dbConnection;
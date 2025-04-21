const express=require('express');
const cors=require('cors');
const bodyparser=require('body-parser');
const app=express();
const port = 8000;
const dbConnection = require('./db/mysqlConnection.js');
const routes=require('./routes/getUserRoute.js');

app.use(cors());
app.use(bodyparser.json());

dbConnection.connect(err=>{
    if(err){
        console.log('database connection fail------->',err);
    }
    else{
        console.log('database connection successfull');
    }
})

app.use(routes);


app.listen(port,()=>{
    console.log(`server started on http://localhost:${port}`)
})
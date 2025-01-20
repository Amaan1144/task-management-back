const mysql = require('mysql2');
const dotenv = require("dotenv");

dotenv.config();

const db = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.DBUSER,
    password: process.env.DBPASS,
    database: process.env.DB,
    port: process.env.port
});

db.connect((err)=> {
    if(err){
        console.error('Error connecting to MySQL:', err);
    }else{
        console.log('Connected to MySQL database');
    }
});

module.exports = db;
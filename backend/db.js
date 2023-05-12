const mysql = require('mysql');

var con = mysql.createConnection({
  host: "localhost",
  port:3306,
  user: "root",
  password: "1akshram",
  database:'users'
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected!");
});

module.exports =  con;
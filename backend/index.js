const express = require('express');
const cors = require('cors')
const db = require('./db.js')
const app = express();

app.use(express.json())
app.use(
  cors({
    origin: "*"
  })
);

app.post("/register", (req, res) => {
  const username = req.body.name;
  const password = req.body.password;
  const email = req.body.email;

  try {
    // If the user existed
    db.query("SELECT email FROM user WHERE email=?",email,(err,data)=>{
        if(err)return res.status(500).json("Error in Mysql")
        if(data.length>0)return res.status(403).json("User Existed");

        const q = "INSERT INTO user(`username`,`email`,`password`) VALUES (?)";
        const values = [username,email,password];

        db.query(q,[values],(err,data)=>{
            if(err)return res.status(500).json("error");
            return res.status(200).json("Successfully Added");
        })
    });
  } catch (error) {
    res.status(500).json("Server Crashed")
  }

  res.send("Logged in successfully!");
});

app.post('/login',(req,res)=>{
      const password = req.body.password;
      const email = req.body.email;

      db.query("SELECT * FROM user WHERE email=?", email, (err, data) => {
        if (err) return res.status(500).json("Error in Mysql");
        if (data.length === 0) return res.status(404).json("User Not Found");
        
        const pass = data[0].password;
        if(pass!==password)return res.status(409).json("Not Correct Crdentials")
      });

      res.status(200).json("Login");

})

process.on('uncaughtException',()=>{
    console.log("ERROR: Occured")
})

app.listen('8000',()=>{
    console.log("Started")
})
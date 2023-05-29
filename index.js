const express = require('express');
const bodyParser = require('body-parser');

const mysql= require('mysql');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json());
app.use(express.json())

const db = mysql.createConnection({
    host: 'localhost',
    user:'root',
    password:"",
    database: 'bookstore',
});
db.connect((err)=>{
    if(err){
        console.log(err);
        throw err;}
    console.log('MySQL Connected')
    db.query('SELECT * FROM users'), function(err, res, fields){
        if(err) {throw err;}
        console.log(res)
    }
})


app.post("/api/create", (req, res)=>{
    const fullname  = req.body.fullname;
    const email  = req.body.email;
    const password  = req.body.password;
    const contact = req.body.contact;
    const address = req.body.address;

    db.query(
        "INSERT INTO users (name, email, password, contact, address) VALUES (?,?,?,?,?)", 
        [fullname, email, password, contact, address],
        (err, res)=>{
            if(err) throw err
            else res.send("record inserted")
        }
    )
})

app.post('/login', (req, res)=>{
    "SELECT * FROM users WHERE email = ? AND password = ?", 
    [req.body.email, req.body.pwd],
    (err, res)=>{
        if(err) {
            res.send({err:err})
        }
        else{
            if(res)
            {
                res.send(res)
            }
            else{
                res.send({message: "no username found"});
            }
        }
    }
})
app.listen(8001, ()=>{
    console.log('running server at port 8001')
})
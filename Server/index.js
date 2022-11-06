const express = require("express");
const mysql = require("mysql");
const cors = require("cors"); //5.2K (gzipped: 2.1K)

const app = express();

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "password",
    database: "janh",
});

app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;



    db.query("INSERT INTO loginsystem (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            if(err){
                res.status(400).json({err})
            }
            res.status(200).json(result)
    });
});

app.post('/login', (req, res)=>{
    const username = req.body.username
    const password = req.body.password
    db.query("SELECT * FROM loginsystem WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {

            if(err){
                res.status(400).json({err: err});
            }
            if(result && result.length > 0) {
                res.status(200).json(result)
            }else{
                res.status(403).json({error: "Wrong username/password combination!"});
            }
        }
    );
});

app.listen(3001, () => {
    console.log("running server");
});
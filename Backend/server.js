import express from 'express';
import dotenv from 'dotenv';
import connectdb from './db/db.js';

dotenv.config();

const app = express();

app.get("/products", (req, res) =>{
res.send("Sever is ready123")
});

app.listen(5000, ()=> {
    connectdb();
    console.log("server started at http://localhost:5000");
    
})
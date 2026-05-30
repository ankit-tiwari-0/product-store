import express from 'express';
import dotenv from 'dotenv';
import connectdb from './db/db.js';
import products from './models/product.model.js';

dotenv.config();

const app = express();
app.use(express.json());

app.post("/api/products", async (req, res) =>{
  const product = req.body;

  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({success: false, message: "please provide all field"});
  }

  const newProduct = new products(product)

  try {
    await newProduct.save();
    res.status(201).json({ success: true, data: newProduct})
  } catch (error) {
    console.log("Error in create product:", error.message);
    res.status(500).json({success: false, message: "server error"})
  }
});

app.delete("api/products/id", async (req, res)=>{
    const {id} = req.body;  //what ever u write their instead og id /hello {helo}
    console.log("id", id);
    
})

app.listen(5000, ()=> {
    connectdb();
    console.log("server started at http://localhost:5000");
    
})
import express from 'express';
import dotenv from 'dotenv';
import connectdb from './db/db.js';
import products from './models/product.model.js';

dotenv.config();

const app = express();
app.use(express.json());

app.get("/api/products", async (req, res)=>{
    try {
        const product = await products.find({});
        res.status(200).json({success: true, data: product})
    } catch (error) {
        console.log("error in fetching", error.message);
        res.status(500).json({success: false, message: "server err"})
        
    }
})

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

app.delete("/api/products/:id", async (req, res)=>{
    const {id} = req.params;  //what ever u write their instead og id /hello {helo}

    try {
        await products.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"})
    } catch (error) {
        res.status(404).json({ success: false, message: "Product not found"})
    }
    
})

app.listen(5000, ()=> {
    connectdb();
    console.log("server started at http://localhost:5000");
    
})
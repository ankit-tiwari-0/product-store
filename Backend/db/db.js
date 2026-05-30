import mongoose from "mongoose";

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGOOO)
        console.log("db is running");
        
    } catch (error) {
        console.log(error, "eeee");
        
    }
}

export default connectdb;
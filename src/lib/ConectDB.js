import mongoose from "mongoose";
import { config } from "dotenv";

config();

const Mongoose_URI=process.env.Mongoose_URI

export const connectDB= async()=>{
    try{
        if(!Mongoose_URI){
            throw new Error("Mongoose_URI is not defined")
        }
        await mongoose.connect(Mongoose_URI);
        console.log("MongoDB Connected");
    }catch(e){
        console.log(e);
    }
}
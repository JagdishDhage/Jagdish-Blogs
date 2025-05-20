import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    ProfileImg:{
        type:String,
        default:""
    }
})
export default mongoose.models.users || mongoose.model('users',userSchema);
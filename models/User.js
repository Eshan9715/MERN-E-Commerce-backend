import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    nickname:{
        type: String,
        required: true,
        unique: true
    },
    email:{
        type: String,
        required: true
    }, 
    password:{
        type: String,
        required: true,
        minlength: 5
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        immutable: true,
        default: ()=> Date.now()
    },
    updatedAt:  {
        type: Date,
        default: ()=> Date.now()
    },
})

export default mongoose.model("User",userSchema)

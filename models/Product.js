import mongoose from "mongoose";

const productScema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    desc:{
        type: String,
        required: true,
    },
    img:{
        type: String,
        required: true
    }, 
    categories:{
        type: Array,
        required: true,
    },
    size:{
        type: Array,
        required: true,

    },
    color:{
        type: Array,
        required: true,

    },
    inStock:{
        type: Boolean,
        default: true,

    },
    price:{
        type: String,
        required: true,

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

export default mongoose.model("Product",productScema)

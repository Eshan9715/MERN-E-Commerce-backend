import mongoose from "mongoose";

const cartScema = new mongoose.Schema({
    userId:{
        type: String,
        required: true,
        unique: true
    },
    products:[
        {
            prouctId:{
                type: String,

            },
            quantity:{
                type: Number,
                default:1
            }
        }
    ],
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

export default mongoose.model("Cart",cartScema)
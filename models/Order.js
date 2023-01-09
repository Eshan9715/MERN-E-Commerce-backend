import mongoose from "mongoose";

const orderScema = new mongoose.Schema({
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
    amount:{
        type: String,
        required: true,
    },
    address:{
        type: Object,
        required: true,
    },
    status:{
        type: String,
        default: "pending",
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

export default mongoose.model("Order",orderScema)
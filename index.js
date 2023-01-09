import express from "express";
import mongoose from "mongoose";
import cors from 'cors'
import dotenv from 'dotenv'

import userRouter from "./routes/user-routes.js";
import productRouter from "./routes/product-routes.js";
import cartRouter from "./routes/cart-routes.js";
import stripeRouter from "./routes/stripe-routes.js";
import orderRouter from "./routes/order-routes.js";

const app = express()
app.use(express.json());
app.use(cors());
dotenv.config();

app.use("/api/users",userRouter);
app.use("/api/products",productRouter);
app.use("/api/carts",cartRouter);
app.use("/api/orders",orderRouter);
app.use("/api/checkout",stripeRouter);

mongoose.set("strictQuery", true)

mongoose.connect('mongodb+srv://user:2o7vJWkgtveSWPtX@cluster0.bvyorur.mongodb.net/?retryWrites=true&w=majority')
.then(()=>
    app.listen(5000))
.then(()=>
    console.log('connected'))
.catch((err)=>
    console.log(err));

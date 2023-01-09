import { addCart, deleteCart, getAllCarts, getCart, updateCart } from "../controllers/cart-controller.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthentication, verifyToken } from "./verifyToken.js";

import express from "express";

const cartRouter = express.Router();

cartRouter.delete("/:id", verifyTokenAndAuthentication, deleteCart)
cartRouter.get("/find/:userId",verifyTokenAndAuthentication, getCart)
cartRouter.post("/",verifyToken, addCart)
cartRouter.get("/",verifyToken, getAllCarts)
cartRouter.put("/:id", verifyTokenAndAuthentication, updateCart)



export default cartRouter;
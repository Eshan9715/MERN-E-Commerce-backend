import { addOrder, deleteOrder, getAllOrders, getMonIncome, getOrder, updateOrder } from "../controllers/order-controller.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthentication, verifyToken } from "./verifyToken.js";

import express from "express";

const orderRouter = express.Router();

orderRouter.delete("/:id", verifyTokenAndAdmin, deleteOrder)
orderRouter.get("/find/:id",verifyTokenAndAuthentication, getOrder)
orderRouter.get("/",verifyTokenAndAdmin, getAllOrders)
orderRouter.get("/addProuct",verifyToken, addOrder)
orderRouter.get("/:id", verifyTokenAndAdmin, updateOrder)
orderRouter.get("/:id", verifyTokenAndAdmin, getMonIncome)



export default orderRouter;
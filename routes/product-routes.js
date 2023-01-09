import { addProduct, deleteProduct, getAllProducts, getProduct, updateProduct } from "../controllers/product-controller.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthentication } from "./verifyToken.js";

import express from "express";

const productRouter = express.Router();

productRouter.delete("/:id", verifyTokenAndAuthentication, deleteProduct)
productRouter.get("/find/:id", getProduct)
productRouter.get("/", getAllProducts)
productRouter.post("/add", verifyTokenAndAdmin, addProduct)
productRouter.put("/:id", verifyTokenAndAdmin, updateProduct)



export default productRouter;
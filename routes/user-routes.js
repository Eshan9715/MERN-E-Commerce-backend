import express from "express";

import { deleteUser, getAllUsers, getUser, getUserStats, jwtVerify, signup, login } from "../controllers/user-controller.js";
import { verifyTokenAndAdmin, verifyTokenAndAuthentication } from "./verifyToken.js";

const userRouter = express.Router();

userRouter.put("/:id", verifyTokenAndAuthentication, jwtVerify)
userRouter.delete("/:id", verifyTokenAndAuthentication, deleteUser)
userRouter.get("/find/:id", verifyTokenAndAdmin, getUser)
userRouter.get("/", verifyTokenAndAdmin, getAllUsers)
userRouter.get("/stats", verifyTokenAndAdmin, getUserStats)

userRouter.post("/signup",signup);
userRouter.post("/login",login);

export default userRouter;
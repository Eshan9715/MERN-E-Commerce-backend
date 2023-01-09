import { payment } from "../controllers/stripe-controller.js";

import express from "express";

const stripeRouter = express.Router();

stripeRouter.post("/payment", payment)



export default stripeRouter;
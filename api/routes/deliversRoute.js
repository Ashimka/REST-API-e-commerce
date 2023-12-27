import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const router = new Router();

router.get("/", OrderController.allOrders);

export default router;

import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const router = new Router();

router.get("/", OrderController.newNotConfirmedOrders);
router.patch("/", OrderController.confirmationOfOrder);

export default router;

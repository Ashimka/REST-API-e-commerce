import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const router = new Router();

router
  .get("/", OrderController.newNotConfirmedOrders)
  .get("/:confirmed", OrderController.confirmedOrders)
  .get("/:isready", OrderController.isReadyOrders);

export default router;

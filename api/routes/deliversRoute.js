import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

const router = new Router();

router
  .get("/", OrderController.newNotConfirmedOrders)
  .get("/new-orders", OrderController.confirmedOrder)
  .get("/isready", OrderController.isReadyOrder);

export default router;

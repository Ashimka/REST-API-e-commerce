import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const router = new Router();

router.post("/register", AuthController.registration);

export default router;

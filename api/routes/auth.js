import { Router } from "express";
import AuthController from "../controllers/AuthController.js";

const router = new Router();

router.post("/register", AuthController.registration);
router.post("/login", AuthController.login);
router.get("/activate/:link", AuthController.activateAccount);

export default router;

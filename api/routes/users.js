import { Router } from "express";

import UserController from "../controllers/UserController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = new Router();

router.get("/", isAuth, UserController.allUsers);
router.post("/profile", UserController.userProfile);

export default router;

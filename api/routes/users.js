import { Router } from "express";

import UserController from "../controllers/UserController.js";
import { isAuth } from "../middleware/authMiddleware.js";

const router = new Router();

router.get("/", UserController.allUsers);
router.get("/:id", UserController.getOneUser);
router.post("/profile", isAuth, UserController.userProfile);
router.delete("/", UserController.deleteUser);

export default router;

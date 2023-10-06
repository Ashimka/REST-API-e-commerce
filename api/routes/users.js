import { Router } from "express";

import UserController from "../controllers/UserController.js";

const router = new Router();

router.get("/", UserController.allUsers);
router.post("/profile", UserController.userProfile);

export default router;

import { Router } from "express";

import auth from "./auth.js";
import users from "./users.js";
import admin from "./admin.js";

const router = new Router();

router.use("/auth", auth);
router.use("/users", users);
router.use("/admins", admin);
// router.use("/products", product);
// router.use("/orders", order);
// router.use("/cart", cart);

export default router;

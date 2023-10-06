import { Router } from "express";

import auth from "./auth.js";
import users from "./users.js";

const router = new Router();

router.use("/auth", auth);
router.use("/users", users);
// router.use("/products", product);
// router.use("/orders", order);
// router.use("/cart", cart);

export default router;

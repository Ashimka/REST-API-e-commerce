import { Router } from "express";

import authRoute from "./authRoute.js";
import usersRoute from "./usersRoute.js";
import adminRoute from "./adminRoute.js";
import productRoute from "./productRoute.js";
import uploadRoute from "./uploadRoute.js";
import deleteFileRoute from "./deleteFileRoute.js";

const router = new Router();

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/admins", adminRoute);
router.use("/products", productRoute);
router.use("/upload", uploadRoute);
router.use("/file", deleteFileRoute);

// router.use("/cart", cart);

export default router;

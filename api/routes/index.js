import { Router } from "express";

import authRoute from "./authRoute.js";
import usersRoute from "./usersRoute.js";
import adminRoute from "./adminRoute.js";
import productRoute from "./productRoute.js";
import uploadRoute from "./uploadRoute.js";
import deleteFileRoute from "./deleteFileRoute.js";
import deliversRoute from "./deliversRoute.js";

import { isAuth } from "../middleware/authMiddleware.js";
import verifyRoles from "../middleware/verifyRoles.js";
import ROLES_LIST from "../options/rolesList.js";

const router = new Router();

router.use("/auth", authRoute);
router.use("/users", usersRoute);
router.use("/admins", adminRoute);
router.use("/products", productRoute);
router.use("/upload", uploadRoute);
router.use("/file", deleteFileRoute);
router.use(
  "/delivers",
  isAuth,
  verifyRoles([ROLES_LIST.admin, ROLES_LIST.deliveryMan]),
  deliversRoute
);

export default router;

import { Router } from "express";
import AdminController from "../controllers/AdminController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import verifyRoles from "../middleware/verifyRoles.js";

import ROLES_LIST from "../options/rolesList.js";

const router = new Router();

router
  .post(
    "/category",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    AdminController.createCategory
  )
  .get("/category", AdminController.getAllCategory)
  .delete(
    "/category",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    AdminController.removeCategory
  );

export default router;

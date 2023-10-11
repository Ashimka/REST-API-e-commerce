import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";
import ProductController from "../controllers/ProductController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import verifyRoles from "../middleware/verifyRoles.js";

import ROLES_LIST from "../options/rolesList.js";

const router = new Router();

router
  .post(
    "/category",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    CategoryController.createCategory
  )
  .get("/category", CategoryController.getAllCategory)
  .delete(
    "/category",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    CategoryController.removeCategory
  );
router.post("/products", ProductController.createProduct);

export default router;

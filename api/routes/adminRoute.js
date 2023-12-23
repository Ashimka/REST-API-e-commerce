import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";
import OrderController from "../controllers/OrderController.js";
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
  .get(
    "/category/:cat",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    CategoryController.getOneCategory
  )
  .delete(
    "/category/:id",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    CategoryController.removeCategory
  )
  .patch(
    "/category/:id",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    CategoryController.updateCategory
  );
router
  .post(
    "/products",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    ProductController.createProduct
  )
  .get("/products", ProductController.getAllProducts)
  .get(
    "/products/:id",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    ProductController.getOneProduct
  )
  .delete(
    "/products/:id",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    ProductController.deleteProduct
  )
  .patch(
    "/products/:id",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    ProductController.updateProduct
  )
  .get(
    "/orders",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    OrderController.allOrders
  );

export default router;

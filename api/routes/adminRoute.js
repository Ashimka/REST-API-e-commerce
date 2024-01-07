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
    verifyRoles(ROLES_LIST.admin),
    CategoryController.createCategory
  )
  .get("/category", CategoryController.getAllCategory)
  .get(
    "/category/:cat",
    isAuth,
    verifyRoles(ROLES_LIST.admin),
    CategoryController.getOneCategory
  )
  .delete(
    "/category/:id",
    isAuth,
    verifyRoles(ROLES_LIST.admin),
    CategoryController.removeCategory
  )
  .patch(
    "/category/:id",
    isAuth,
    verifyRoles(ROLES_LIST.admin),
    CategoryController.updateCategory
  );
router
  .post(
    "/products",
    isAuth,
    verifyRoles(ROLES_LIST.admin),
    ProductController.createProduct
  )
  .get("/products", ProductController.getAllProducts)
  .get(
    "/products/:id",
    isAuth,
    verifyRoles(ROLES_LIST.admin),
    ProductController.getOneProduct
  )
  .delete(
    "/products/:id",
    isAuth,
    verifyRoles(ROLES_LIST.admin),
    ProductController.deleteProduct
  )
  .patch(
    "/products/:id",
    isAuth,
    verifyRoles(ROLES_LIST.admin),
    ProductController.updateProduct
  );
router
  .get(
    "/orders",
    isAuth,
    verifyRoles(ROLES_LIST.admin),
    OrderController.newNotConfirmedOrders
  )
  .get(
    "/orders-confirm",
    isAuth,
    verifyRoles(ROLES_LIST.admin),
    OrderController.confirmedOrder
  )
  .get(
    "/orders-noconfirm",
    isAuth,
    verifyRoles(ROLES_LIST.admin),
    OrderController.isReadyOrder
  );

export default router;

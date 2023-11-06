import { Router } from "express";
import OrderController from "../controllers/OrderController.js";

import UserController from "../controllers/UserController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import verifyRoles from "../middleware/verifyRoles.js";

import ROLES_LIST from "../options/rolesList.js";

const router = new Router();

router
  .get("/", UserController.allUsers)
  .delete(
    "/",
    isAuth,
    verifyRoles(ROLES_LIST.admin_role),
    UserController.deleteUser
  );

router
  .get("/profile", isAuth, UserController.getOneUser)
  .post("/profile", isAuth, UserController.userProfile)
  .patch("/profile", isAuth, UserController.userProfileUpdate);
router.post("/order", isAuth, OrderController.newOrder);

export default router;

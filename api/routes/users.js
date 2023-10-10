import { Router } from "express";

import UserController from "../controllers/UserController.js";
import { isAuth } from "../middleware/authMiddleware.js";
import verifyRoles from "../middleware/verifyRoles.js";

import ROLES_LIST from "../options/rolesList.js";

const router = new Router();

router.get("/", UserController.allUsers);
router.get("/:id", UserController.getOneUser);
router.post("/profile", isAuth, UserController.userProfile);
router.patch("/profile", isAuth, UserController.userProfileUpdate);
router.delete(
  "/",
  isAuth,
  verifyRoles(ROLES_LIST.admin),
  UserController.deleteUser
);

export default router;

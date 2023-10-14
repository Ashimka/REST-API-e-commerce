import { Router } from "express";
import AuthController from "../controllers/AuthController.js";
import validationErrors from "../error/validationErrors.js";
import { authValidation } from "../validations.js";

const router = new Router();

router.post(
  "/register",
  authValidation,
  validationErrors,
  AuthController.registration
);
router.post("/login", authValidation, validationErrors, AuthController.login);
router.get("/activate/:link", AuthController.activateAccount);
router.get("/logout", AuthController.logout);
router.get("/refresh", AuthController.refreshToken);

export default router;

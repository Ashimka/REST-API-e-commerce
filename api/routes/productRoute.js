import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";
import ProductController from "../controllers/ProductController.js";

const router = new Router();

router.get("/", ProductController.getAllProducts);
router.get("/:category", CategoryController.getOneCategory);
export default router;

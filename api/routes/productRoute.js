import { Router } from "express";
import CategoryController from "../controllers/CategoryController.js";
import ProductController from "../controllers/ProductController.js";

const router = new Router();

router.get("/", ProductController.getAllProducts);
router.get("/category/:category", CategoryController.getOneCategory);
router.get("/:id", ProductController.getOneProduct);
export default router;

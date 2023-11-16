import { Router } from "express";

import DeleteController from "../controllers/DeleteFileController.js";

const router = new Router();

router.delete("/:name", DeleteController.deleteFile);

export default router;

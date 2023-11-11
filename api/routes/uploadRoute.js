import { Router } from "express";

import fileUpload from "../middleware/storageUploads.js";
import UploadController from "../controllers/UploadController.js";

const router = new Router();

router.post("/", fileUpload.single("image"), UploadController.createFile);

export default router;

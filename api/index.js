import express from "express";
import path from "path";
import "dotenv/config";
import cookieParser from "cookie-parser";
import cors from "cors";

import { getDirname } from "./options/utils.js";
import router from "./routes/index.js";
import errorHandler from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 8001;
const __dirname = getDirname(import.meta.url);

const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.use("/api", router);
app.use("/api/upload", express.static(path.join(__dirname, "upload")));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

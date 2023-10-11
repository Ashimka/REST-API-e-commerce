import express from "express";
import "dotenv/config";
import cookieParser from "cookie-parser";

import router from "./routes/index.js";
import errorHandler from "./middleware/errorMiddleware.js";

const PORT = process.env.PORT || 8001;
const app = express();

app.use(express.json());

app.use(cookieParser());

app.use("/api", router);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

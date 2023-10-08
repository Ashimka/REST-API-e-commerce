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

// app.get("/api", async (req, res) => {
//   try {
//     const allUser = await prisma.user.findMany({
//       select: {
//         email: true,
//         role: true,
//       },
//       // include: { role: true },
//     });
//     res.status(200).json(allUser);
//   } catch (error) {
//     console.log(error);
//   }
// });
// app.post("/api", async (req, res) => {
//   try {
//     const newUser = await prisma.user.create({ data: req.body });

//     await prisma.role.create({ data: { userId: newUser.id } });
//     res.status(200).json(newUser);
//   } catch (error) {
//     console.log(error);
//   }
// });

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});

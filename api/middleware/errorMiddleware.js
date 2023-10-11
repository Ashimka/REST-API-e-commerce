import { Prisma } from "@prisma/client";

import ApiError from "../error/apiError.js";

const errorHandler = (err, req, res, next) => {
  // console.log(err);
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, errors: err.errors });
  }

  if (err instanceof Prisma.PrismaClientKnownRequestError) {
    return res
      .status(400)
      .json({ "code": err.code, "message": err.message, "meta": err.meta });
  }

  if (err instanceof Prisma.PrismaClientValidationError) {
    return res
      .status(404)
      .json({ "Error!": "Не найдено", message: err.message });
  }

  return res.status(500).json({ message: "Непредвиденная ошибка" });
};

export default errorHandler;

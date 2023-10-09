import jwt from "jsonwebtoken";

import ApiError from "../error/apiError.js";

export const isAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;

  if (!authHeader.startsWith("Bearer ")) {
    throw ApiError.unauthorizedError("Не авторизован");
  }

  const token = authHeader.split(" ")[1];

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, decoded) => {
    if (error) throw ApiError.forbiden("invalid token");

    req.login = decoded.UserInfo.login;
    req.id = decoded.UserInfo.id;
    req.roles = decoded.UserInfo.roles;

    next();
  });
};

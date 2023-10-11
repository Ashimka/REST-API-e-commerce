import { PrismaClient } from "@prisma/client";

import jwt from "jsonwebtoken";

import "dotenv/config";
import ApiError from "../error/apiError.js";
import RolesServise from "./RolesServise.js";

const prisma = new PrismaClient();

class TokenService {
  createToken(data) {
    const accessToken = jwt.sign(data, process.env.ACCESS_TOKEN_SECRET, {
      expiresIn: "25m",
    });
    const refreshToken = jwt.sign(data, process.env.REFRESH_TOKEN_SECRET, {
      expiresIn: "1d",
    });

    return { accessToken, refreshToken };
  }

  async saveToken(userId, refreshToken) {
    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
    });
  }

  async removeToken(userId) {
    await prisma.user.update({
      where: { id: userId },
      data: {
        refreshToken: null,
      },
    });
  }

  refreshToken(user, refreshToken) {
    const token = jwt.verify(
      refreshToken,
      process.env.REFRESH_TOKEN_SECRET,
      (error, decoded) => {
        const { ...data } = decoded.UserInfo;

        if (error || user.email !== data.email)
          throw ApiError.forbiden("invalid token");

        const dataToken = {
          "UserInfo": {
            "email": data.email,
            "id": data.id,
            roles: RolesServise.addRole(user.role),
          },
        };

        return dataToken;
      }
    );
    return token;
  }
}

export default new TokenService();

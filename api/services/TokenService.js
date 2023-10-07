import { PrismaClient } from "@prisma/client";
// import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import "dotenv/config";

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
}

export default new TokenService();

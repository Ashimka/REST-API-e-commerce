import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";

const prisma = new PrismaClient();

import AppError from "../error/apiError.js";

class AuthService {
  async registration({ email, password }) {
    const duplicate = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (duplicate) {
      throw AppError.conflict("Пользователь с таким email существует");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const activateLink = uuid();

    const newUser = await prisma.user.create({
      data: { email, password: hashPassword, activateLink },
    });

    const roles = await prisma.role.create({ data: { userId: newUser.id } });

    return { data: { ...newUser, roles } };
  }
  async login(email, password) {}
  async logout() {}
}

export default new AuthService();

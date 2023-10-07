import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import "dotenv/config";

import MailService from "./MailService.js";

const prisma = new PrismaClient();

import ApiError from "../error/apiError.js";

class AuthService {
  async registration({ email, password }) {
    const duplicate = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (duplicate) {
      throw ApiError.conflict("Пользователь с таким email существует");
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const activateLink = uuid();

    const newUser = await prisma.user.create({
      data: { email, password: hashPassword, activateLink },
    });

    const roles = await prisma.role.create({ data: { userId: newUser.id } });

    await MailService.sendActivationMail(
      email,
      `${process.env.URL_API}/auth/activate/${activateLink}`
    );

    return { data: { ...newUser, roles } };
  }
  async activateAccount(link) {
    const user = await prisma.user.findFirst({
      where: { activateLink: link },
    });

    if (!user) throw ApiError.badRequest("Пользователь не найден");

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        isActivated: true,
      },
    });
  }
  async login(email, password) {}
  async logout() {}
}

export default new AuthService();

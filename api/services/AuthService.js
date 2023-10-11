import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import "dotenv/config";

import MailService from "./MailService.js";
import RolesServise from "./RolesServise.js";
import TokenService from "./TokenService.js";

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

  async login({ email, password }) {
    const userAuth = await prisma.user.findFirst({
      where: { email },
      select: { id: true, email: true, password: true, role: true },
    });

    if (!userAuth) throw ApiError.badRequest("Неверный логин или пароль");

    const matchPassword = await bcrypt.compare(password, userAuth.password);

    if (!matchPassword) throw ApiError.badRequest("Неверный логин или пароль");

    const dataToken = {
      "UserInfo": {
        "email": userAuth.email,
        "id": userAuth.id,
        roles: RolesServise.addRole(userAuth.role),
      },
    };

    const tokens = TokenService.createToken(dataToken);

    await TokenService.saveToken(userAuth.id, tokens.refreshToken);

    return { tokens, userAuth };
  }

  async logout(refreshToken) {
    const userId = await prisma.user.findFirst({
      where: { refreshToken },
    });

    await TokenService.removeToken(userId.id);
  }

  async refreshToken(refreshToken) {
    const foundUser = await prisma.user.findFirst({
      where: { refreshToken },
      select: { id: true, email: true, role: true },
    });

    const token = await TokenService.refreshToken(foundUser, refreshToken);

    const { accessToken } = TokenService.createToken(token);

    return accessToken;
  }
}

export default new AuthService();

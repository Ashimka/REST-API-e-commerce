import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

import ApiError from "../error/apiError.js";

class UserService {
  async allUsers() {
    const allUsers = await prisma.user.findMany({
      select: { id: true, email: true, role: true },
    });
    return allUsers;
  }

  async getOneUser({ id }) {
    const oneUser = await prisma.user.findUnique({
      where: { id },
    });

    if (!oneUser) {
      throw ApiError.badRequest("Пользователь не найден");
    }

    return oneUser;
  }

  async deleteUser({ id }) {
    const user = await prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw ApiError.badRequest("Пользователь не найден");
    }

    await prisma.user.delete({
      where: { id },
      include: { role: true },
    });
  }

  async userProfile({ userId, name, addres, phone }) {
    const profile = await prisma.profile.create({
      data: { userId, name, addres, phone },
    });
    return profile;
  }
}

export default new UserService();

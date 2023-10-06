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
  async userProfile({ userId, name, addres, phone }) {
    const profile = await prisma.profile.create({
      data: { userId, name, addres, phone },
    });
    return profile;
  }
}

export default new UserService();

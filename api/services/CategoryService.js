import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class CategoryService {
  async createCategory({ name }) {
    const newCat = await prisma.category.create({
      data: { name },
    });

    return newCat;
  }

  async getAllCategory() {
    const allCat = await prisma.category.findMany({
      select: {
        name: true,
      },
    });

    return allCat;
  }

  async removeCategory({ id }) {
    await prisma.category.delete({
      where: { id },
    });
  }
}
export default new CategoryService();

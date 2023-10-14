import { PrismaClient } from "@prisma/client";
import ApiError from "../error/apiError.js";

const prisma = new PrismaClient();

class CategoryService {
  async createCategory({ name }) {
    const newCat = await prisma.category.create({
      data: { name },
    });

    return newCat;
  }

  async getOneCategory(cat) {
    const category = await prisma.product.findMany({
      where: {
        category: cat,
      },
    });

    if (!category.length) {
      throw ApiError.notFound("Не найдено");
    }

    return category;
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

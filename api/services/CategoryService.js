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
    const category = await prisma.category.findMany({
      where: {
        name: cat,
      },
      select: {
        name: true,
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
        id: true,
      },
    });

    return allCat;
  }

  async removeCategory(id) {
    const cat = await prisma.category.delete({
      where: { id },
    });

    return cat;
  }

  async updateCategory(id, name) {
    const category = await prisma.category.update({
      where: { id },
      data: {
        name,
      },
    });

    return category;
  }
}
export default new CategoryService();

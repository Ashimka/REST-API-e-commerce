import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductService {
  async createProduct({ name, description, image, price, in_stock, category }) {
    const newProduct = await prisma.product.create({
      data: { name, description, image, price, in_stock, category },
    });

    return newProduct;
  }
}

export default new ProductService();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductService {
  async createProduct({
    name,
    description,
    image,
    price,
    in_stock,
    category,
    catId,
  }) {
    const newProduct = await prisma.product.create({
      data: { name, description, image, price, in_stock, category },
    });

    await prisma.product_Cat.create({
      data: {
        name: newProduct.category,
        productId: newProduct.id,
        categoryId: catId,
      },
    });

    return newProduct;
  }
}

export default new ProductService();

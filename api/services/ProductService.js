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

  async getAllProducts({ limit, page }) {
    const products = await prisma.product.findMany({
      take: limit,
      skip: (page - 1) * limit,
    });

    const quantityProducts = await prisma.product.count();
    const totelPages = Math.ceil(quantityProducts / Number.parseInt(limit));

    return { totelPages, quantityProducts, products };
  }
}

export default new ProductService();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class ProductService {
  async createProduct({ name, description, image, price, in_stock, category }) {
    const newProduct = await prisma.product.create({
      data: {
        name,
        description,
        image,
        price: Number(price),
        in_stock: Boolean(in_stock),
      },
    });

    await prisma.product_Cat.create({
      data: {
        name: category,
        productId: newProduct.id,
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

  async getOneProduct(id) {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    return product;
  }

  async deleteProduct(id) {
    const product = await prisma.product.delete({
      where: { id },
    });

    return product;
  }
}

export default new ProductService();

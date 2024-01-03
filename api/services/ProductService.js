import { PrismaClient } from "@prisma/client";
import { textTranslit } from "../options/textTranslit.js";

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
        name: textTranslit(category),
        productId: newProduct.id,
      },
    });

    return newProduct;
  }

  async getAllProducts({ limit, page }) {
    const products = await prisma.product.findMany({
      take: limit,
      skip: (page - 1) * limit,

      select: {
        id: true,
        name: true,
        description: true,
        image: true,
        price: true,
        in_stock: true,
        discount: true,
        category: {
          select: {
            name: true,
          },
        },
      },
      orderBy: {
        category: {
          name: "asc",
        },
      },
    });

    const quantityProducts = products.length;

    const totelPages = Math.ceil(quantityProducts / Number.parseInt(limit));

    return { totelPages, quantityProducts, products };
  }

  async getOneProduct(id) {
    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        category: {
          select: {
            name: true,
          },
        },
      },
    });

    return product;
  }

  async deleteProduct(id) {
    const product = await prisma.product.delete({
      where: { id },
    });

    return product;
  }

  async updateProduct(id, name, description, image, price, in_stock, category) {
    const productUpdate = await prisma.product.update({
      where: { id },
      data: {
        name,
        description,
        image,
        price: Number(price),
        in_stock: Boolean(in_stock),
      },
    });

    await prisma.product_Cat.update({
      where: { productId: id },
      data: {
        name: textTranslit(category),
      },
    });

    return productUpdate;
  }
}

export default new ProductService();

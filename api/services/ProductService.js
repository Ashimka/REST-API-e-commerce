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

    const idCat = await prisma.category.findUnique({
      where: {
        name: category,
      },
    });

    await prisma.product_Cat.create({
      data: {
        name: textTranslit(category),
        productId: newProduct.id,
        categoryId: idCat.id,
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

  async updateProduct(id, dataProduct) {
    if (Object.keys(dataProduct).length > 2) {
      const productUpdate = await prisma.product.update({
        where: { id },
        data: {
          name: dataProduct.name,
          description: dataProduct.description,
          image: dataProduct.image,
          price: Number(dataProduct.price),
          in_stock: Boolean(dataProduct.in_stock),
        },
      });

      return productUpdate;
    }

    const productUpdate = await prisma.product.update({
      where: { id },
      data: {
        image: dataProduct.image,
      },
    });

    return productUpdate;
  }
}

export default new ProductService();

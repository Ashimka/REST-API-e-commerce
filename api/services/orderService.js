import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class OrderService {
  async newOrder({ detailsOrder, totalPrice, userId }) {
    const newOrder = await prisma.order.create({
      data: {
        detailsOrder,
        totalPrice,
        userId,
      },
    });

    return newOrder;
  }

  async userOreders(userId) {
    const orders = await prisma.order.findMany({
      where: { userId },
    });

    return orders;
  }
}

export default new OrderService();

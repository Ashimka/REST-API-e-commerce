import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class OrderService {
  async newOrder({
    detailsOrder,
    isDelivered,
    userId,
    total_price,
    quantity,
    productId,
  }) {
    const newOrder = await prisma.order.create({
      data: {
        detailsOrder,
        isDelivered,
        userId,
      },
    });

    await prisma.order_Detail.create({
      data: {
        total_price,
        quantity,
        orderId: newOrder.id,
        productId,
      },
    });

    return newOrder;
  }
}

export default new OrderService();

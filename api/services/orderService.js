import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class OrderService {
  async newOrder({ detailsOrder, totalPrice, userId }) {
    const newOrder = await prisma.order.create({
      data: {
        totalPrice,
        userId,
      },
    });

    JSON.parse(detailsOrder).map(async (item) => {
      await prisma.order_details.create({
        data: {
          orderId: newOrder.id,
          productId: item.id,
          count: item.count,
        },
      });
    });

    return newOrder;
  }

  async userOreders(userId) {
    const orders = await prisma.order.findMany({
      where: { userId },
    });

    return orders;
  }

  async detailsOrder(id) {
    const order = await prisma.order_details.findMany({
      where: { orderId: Number(id) },

      select: {
        count: true,
        product: {
          select: {
            name: true,
            description: true,
            image: true,
            price: true,
          },
        },
      },
    });

    const orderDetails = await prisma.order.findUnique({
      where: {
        id: Number(id),
      },

      select: {
        created_at: true,
        isDelivered: true,
        totalPrice: true,
        user: {
          select: {
            profile: {
              select: {
                name: true,
                addres: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    return { ...orderDetails, order };
  }
}

export default new OrderService();

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

class OrderService {
  async newOrder({ detailsOrder, totalPrice, userId }) {
    const newOrder = await prisma.order.create({
      data: {
        totalPrice,
        userId,
        createdDate: Date.now().toString(),
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
      orderBy: {
        id: "desc",
      },
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
        createdDate: true,
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

  async newNotConfirmedOrders() {
    const orders = await prisma.order.findMany({
      where: {
        isConfirmed: false,
        isReady: false,
        isDelivered: false,
      },
      orderBy: {
        createdDate: "desc",
      },

      select: {
        createdDate: true,
        id: true,

        order_details: {
          select: {
            product: {
              select: {
                description: true,
                name: true,
                price: true,
                category: {
                  select: {
                    category: {
                      select: {
                        name: true,
                      },
                    },
                  },
                },
              },
            },
            count: true,
          },
        },
        user: {
          select: {
            profile: {
              select: {
                name: true,
                phone: true,
                addres: true,
              },
            },
          },
        },
      },
    });

    return orders;
  }

  async confirmedOrders() {
    const orders = await prisma.order.findMany({
      where: {
        isConfirmed: true,
      },
    });

    return orders;
  }

  async isReadyOrders() {
    const orders = await prisma.order.findMany({
      where: {
        isConfirmed: true,
        isReady: true,
      },
      select: {
        totalPrice: true,

        user: {
          select: {
            profile: {
              select: {
                addres: true,
                name: true,
                phone: true,
              },
            },
          },
        },
      },
    });

    return orders;
  }
}

export default new OrderService();

import orderService from "../services/orderService.js";

class OrderController {
  async newOrder(req, res, next) {
    try {
      const { detailsOrder, totalPrice } = req.body;
      const userId = req.id;

      const newOrder = await orderService.newOrder({
        detailsOrder,
        userId,
        totalPrice,
      });

      return res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }

  async userOrders(req, res, next) {
    try {
      const userId = req.id;

      const orders = await orderService.userOreders(userId);

      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();

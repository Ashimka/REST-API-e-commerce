import orderService from "../services/orderService.js";

class OrderController {
  async newOrder(req, res, next) {
    try {
      const { detailsOrder, isDelivered, total_price, quantity, productId } =
        req.body;
      const userId = req.id;

      const newOrder = await orderService.newOrder({
        detailsOrder,
        isDelivered,
        userId,
        total_price,
        quantity,
        productId,
      });

      return res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();

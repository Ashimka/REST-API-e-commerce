import OrderService from "../services/OrderService.js";

class OrderController {
  async newOrder(req, res, next) {
    try {
      const { detailsOrder, totalPrice } = req.body;
      const userId = req.id;

      const newOrder = await OrderService.newOrder({
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

      const orders = await OrderService.userOreders(userId);

      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async orderDetails(req, res, next) {
    try {
      const { id } = req.params;

      const order = await OrderService.detailsOrder(id);

      return res.status(200).json(order);
    } catch (error) {
      next(error);
    }
  }

  async newNotConfirmedOrders(req, res, next) {
    try {
      const { order } = req.query;

      const orders = await OrderService.newNotConfirmedOrders(order);

      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }

  async confirmedOrders(req, res, next) {
    try {
      const orders = await OrderService.confirmedOrders();
      const totalOrders = orders.length;

      return res.status(200).json({ totalOrders, orders });
    } catch (error) {
      next(error);
    }
  }
  async isReadyOrders(req, res, next) {
    try {
      const orders = await OrderService.isReadyOrders();

      return res.status(200).json(orders);
    } catch (error) {
      next(error);
    }
  }
}

export default new OrderController();

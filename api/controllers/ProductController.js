import ProductService from "../services/ProductService.js";

class ProductController {
  async createProduct(req, res, next) {
    try {
      const { name, description, image, price, in_stock, category } = req.body;

      const newProduct = await ProductService.createProduct({
        name,
        description,
        image,
        price,
        in_stock,
        category,
      });

      return res.status(201).json(newProduct);
    } catch (error) {
      next(error);
    }
  }
}
export default new ProductController();

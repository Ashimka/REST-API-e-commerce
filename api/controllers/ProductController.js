import "dotenv/config";

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

  async getAllProducts(req, res, next) {
    try {
      const page = Number.parseInt(req.query.page) || 1;
      const limit = Number.parseInt(process.env.LIMIT_PAGE);

      const allProducts = await ProductService.getAllProducts({
        limit,
        page,
      });

      return res.status(200).json(allProducts);
    } catch (error) {
      next(error);
    }
  }

  async getOneProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await ProductService.getOneProduct(id);

      res.status(200).json(product);
    } catch (error) {
      next(error);
    }
  }

  async deleteProduct(req, res, next) {
    try {
      const { id } = req.params;

      const product = await ProductService.deleteProduct(id);

      res.status(200).json({ message: "Product deleted!", product });
    } catch (error) {
      next(error);
    }
  }

  async updateProduct(req, res, next) {
    try {
      const { id } = req.params;
      const dataProduct = req.body;

      const updateProduct = await ProductService.updateProduct(id, dataProduct);

      res.status(200).json(updateProduct);
    } catch (error) {
      next(error);
    }
  }
}
export default new ProductController();

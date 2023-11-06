import CategoryService from "../services/CategoryService.js";

class CategoryController {
  async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const newCat = await CategoryService.createCategory({ name });

      return res.status(201).json(newCat);
    } catch (error) {
      next(error);
    }
  }

  async getOneCategory(req, res, next) {
    try {
      const { cat } = req.params;

      const category = await CategoryService.getOneCategory(cat);

      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }

  async getAllCategory(req, res, next) {
    try {
      const allCat = await CategoryService.getAllCategory();

      return res.status(200).json(allCat);
    } catch (error) {
      next(error);
    }
  }

  async removeCategory(req, res, next) {
    try {
      const { id } = req.params;

      const cat = await CategoryService.removeCategory(+id);

      return res.json({ message: "Category name deleted!", id: cat.id });
    } catch (error) {
      next(error);
    }
  }

  async updateCategory(req, res, next) {
    try {
      const { id } = req.params;
      const { name } = req.body;

      const category = await CategoryService.updateCategory(+id, name);

      return res.status(200).json(category);
    } catch (error) {
      next(error);
    }
  }
}
export default new CategoryController();

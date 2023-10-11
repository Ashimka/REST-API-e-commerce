import AdminService from "../services/AdminService.js";

class AdminController {
  async createCategory(req, res, next) {
    try {
      const { name } = req.body;

      const newCat = await AdminService.createCategory({ name });

      return res.status(201).json(newCat);
    } catch (error) {
      next(error);
    }
  }

  async getAllCategory(req, res, next) {
    try {
      const allCat = await AdminService.getAllCategory();

      return res.status(200).json(allCat);
    } catch (error) {
      next(error);
    }
  }

  async removeCategory(req, res, next) {
    try {
      const { id } = req.body;

      await AdminService.removeCategory(id);

      return res.json({ message: "Category name deleted!" });
    } catch (error) {
      next(error);
    }
  }
}
export default new AdminController();

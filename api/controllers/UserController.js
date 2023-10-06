import ApiError from "../error/apiError.js";
import UserService from "../services/UserService.js";

class UserController {
  async allUsers(req, res, next) {
    try {
      const allUsers = await UserService.allUsers();

      return res.status(200).json({
        data: {
          quantityUsers: allUsers.length,
          users: allUsers,
        },
      });
    } catch (error) {
      next(error);
    }
  }
  async userProfile(req, res, next) {
    try {
      const { userId, name, addres, phone } = req.body;

      const profile = await UserService.userProfile({
        userId,
        name,
        addres,
        phone,
      });

      return res.status(201).json(profile);
    } catch (error) {
      next(error);
    }
  }
  async oneUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();

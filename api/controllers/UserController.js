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

  async getOneUser(req, res, next) {
    try {
      const { id } = req.params;

      const oneUser = await UserService.getOneUser({ id });

      return res.status(200).json(oneUser);
    } catch (error) {
      next(error);
    }
  }

  async deleteUser(req, res, next) {
    try {
      const { id } = req.body;
      await UserService.deleteUser({ id });

      res.json({ message: "User deleted..." });
    } catch (error) {
      next(error);
    }
  }

  async userProfile(req, res, next) {
    try {
      const userId = req.id;
      const { name, addres, phone } = req.body;

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
  async userProfileUpdate(req, res, next) {
    try {
      const userId = req.id;
      console.log(req);
      const { name, addres, phone } = req.body;

      const profile = await UserService.userProfileUpdate({
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
}

export default new UserController();

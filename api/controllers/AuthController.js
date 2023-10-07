import AuthService from "../services/AuthService.js";
import ApiError from "../error/apiError.js";

class AuthController {
  async registration(req, res, next) {
    try {
      const { email, password } = req.body;

      const newUser = await AuthService.registration({
        email,
        password,
      });

      return res
        .status(201)
        .json({ message: "Регистрация прошла ушпешно!", newUser });
    } catch (error) {
      next(error);
    }
  }

  async activateAccount(req, res, next) {
    try {
      const link = req.params.link;

      await AuthService.activateAccount(link);

      return res.status(201).json({ message: "Аккаунт активирован" });
    } catch (error) {
      next(error);
    }
  }
  async login(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async logout(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

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
      const { email, password } = req.body;
      const userData = await AuthService.login({ email, password });

      res.cookie("refresh_jwt", userData.tokens.refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: true,
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(201).json(userData);
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

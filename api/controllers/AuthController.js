import AuthService from "../services/AuthService.js";
import ApiError from "../error/apiError.js";
import "dotenv/config";

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

      res.cookie("refresh_token", userData.tokens.refreshToken, {
        httpOnly: true,
        sameSite: "None",
        secure: process.env.NODE_ENV === "production",
        maxAge: 24 * 60 * 60 * 1000,
      });

      return res.status(200).json(userData);
    } catch (error) {
      next(error);
    }
  }

  async logout(req, res, next) {
    try {
      const cookies = req.cookies;

      const refreshToken = cookies.refresh_token;
      if (!refreshToken) throw ApiError.unauthorizedError("Не авторизован");

      await AuthService.logout(refreshToken);

      res.clearCookie("refresh_token");

      return res.status(200).json({ message: "logout" });
    } catch (error) {
      next(error);
    }
  }

  async refreshToken(req, res, next) {
    try {
      const cookies = req.cookies;
      const refreshToken = cookies?.refresh_token;

      if (!refreshToken) throw ApiError.unauthorizedError("Не авторизован");

      const accessToken = await AuthService.refreshToken(refreshToken);

      res.status(200).json({ accessToken });
    } catch (error) {
      next(error);
    }
  }
}

export default new AuthController();

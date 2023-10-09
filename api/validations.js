import { body } from "express-validator";

export const authValidation = [
  body("email", "Укажите email").isEmail(),
  body("password", "Длина пароля не менее 6 символов").isLength({ min: 6 }),
];

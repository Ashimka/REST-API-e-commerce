import { body } from "express-validator";

export const registerValidation = [
  body("email", "Укажите email").isEmail(),
  body("phoneNumber", "Введите номер телефона")
    .isMobilePhone()
    .isLength({ min: 10 }),
  body("password", "Длина пароля не менее 6 символов").isLength({ min: 6 }),
];
export const authValidation = [
  body("phoneNumber", "Введите номер телефона")
    .isMobilePhone()
    .isLength({ min: 10 }),
  body("password", "Длина пароля не менее 6 символов").isLength({ min: 6 }),
];

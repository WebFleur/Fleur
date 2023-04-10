import { body } from "express-validator";

export const registerValidation = [
    body("email", "Неверная почта").isEmail(),
    body("password", "Пароль должен содержать минимум 5 знаков").isLength({
        min: 5,
    }),
    body("fullName", "Имя не может быть короче 3 букв").isLength({ min: 3 }),
    body("phone", "Неверно указан номер телефона").isLength(
        { min: 11 },
        { max: 11 }
    ),
];
export const loginValidation = [
    body("email", "Неверная почта").isEmail(),
    body("password", "Пароль неверный").isLength({
        min: 5,
    }),
];

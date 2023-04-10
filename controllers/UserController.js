import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UserModel from "../models/User.js";
import ZapisModel from "../models/Zapis.js";
import { validationResult } from "express-validator"; //проверка на ошибки при валидации регистрации
//все методы
export const register = async (req, res) => {
    try {
        const errors = validationResult(req); //вытаскиваем всё из запроса
        if (!errors.isEmpty()) {
            return res.status(400).json(errors.array());
        }

        const password = req.body.password;
        const salt = await bcrypt.genSalt(10); //алгоритм шифрования пароля
        const hash = await bcrypt.hash(password, salt);

        const doc = new UserModel({
            email: req.body.email,
            fullName: req.body.fullName,
            phone: req.body.phone,
            passwordHash: hash,
        });

        const user = await doc.save(); //сохраняем самого пользователя в mongodb

        const token = jwt.sign(
            {
                _id: user._id, //токен будет хранить зашифрованную инфу(id), по которому вся инфа
            },
            "secret123", //ключ шифрования
            {
                expiresIn: "30d", //срок жизни токена
            }
        );

        const { passwordHash, ...userData } = user._doc;

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось зарегистрироваться :(",
        });
    }
};

export const login = async (req, res) => {
    try {
        const user = await UserModel.findOne({ email: req.body.email });

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const isValidPass = await bcrypt.compare(
            req.body.password,
            user._doc.passwordHash
        );

        if (!isValidPass) {
            return res.status(400).json({
                message: "Неверный логин или пароль",
            });
        }

        const token = jwt.sign(
            {
                _id: user._id, //токен будет хранить зашифрованный id, по которому будет вся инфа
            },
            "secret123", //ключ шифрования
            {
                expiresIn: "30d", //срок жизни токена
            }
        );
        const { passwordHash, ...userData } = user._doc; //убираем хэш

        res.json({
            ...userData,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться :(",
        });
    }
};

export const getMe = async (req, res) => {
    try {
        const user = await UserModel.findById(req.userId);

        if (!user) {
            return res.status(404).json({
                message: "Пользователь не найден",
            });
        }

        const { passwordHash, ...userData } = user._doc;

        res.json(userData);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Нет доступа",
        });
    }
};

export const allzap = async (req, res) => {
    try {
        const allzapi = await ZapisModel.find({ user: req.userId });

        res.json(allzapi);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка",
        });
    }
};

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import MasterModel from "../models/Master.js";
import ZapisModel from "../models/Zapis.js";

export const login = async (req, res) => {
    try {
        const master = await MasterModel.findOne({
            email: req.body.email,
            password: req.body.password,
        });

        if (!master) {
            return res.status(404).json({
                message: "Неверный логин или пароль!",
            });
        }

        const token = jwt.sign(
            {
                _id: master._id, //токен будет хранить зашифрованный id, по которому будет вся инфа
            },
            "secret123", //ключ шифрования
            {
                expiresIn: "30d", //срок жизни токена
            }
        );
        //const { passwordHash, ...masterData } = master._doc; //убираем хэш

        res.json({
            ...master._doc,
            token,
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось авторизоваться! :(",
        });
    }
};

export const getMaster = async (req, res) => {
    try {
        const masterId = req.params.id;
        const master = await MasterModel.findById(masterId);

        res.json(master);
    } catch (err) {
        return res.status(400).json({
            message: "Непредвиденная ошибка",
        });
    }
};

export const getMastera = async (req, res) => {
    try {
        const mastera = await MasterModel.find();
        //const { id, ...masterData } = mastera._doc;

        res.json(mastera);
    } catch (err) {
        return res.status(400).json({
            message: "Непредвиденная ошибка",
        });
    }
};

export const allzap = async (req, res) => {
    try {
        const mastmyid = req.userId.toString();
        const allzapi = await ZapisModel.find({ master: mastmyid });

        res.json(allzapi);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Ошибка",
        });
    }
};

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import MasterModel from "../models/Master.js";
import UserModel from "../models/User.js";
import UslugiModel from "../models/Uslugi.js";
import ZapisModel from "../models/Zapis.js";

export const zapros = async (req, res) => {
    try {
        const doc = new ZapisModel({
            data: req.body.data,
            time: req.body.time,
            master: req.body.master,
            user: req.userId,
            usluga: req.params.id,
        });

        const zapis = await doc.save();
        res.json(zapis);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "Не удалось записаться:(",
        });
    }
};

export const Okna = async (req, res) => {
    try {
        const masters = await ZapisModel.find({
            master: req.params.id.toString(),
        });

        res.json(masters);
    } catch (err) {
        return res.status(400).json({
            message: "Непредвиденная ошибка",
        });
    }
};

/*
export const Prices = async (req, res) => {
    try {
        const masterId = req.params.id;
        const masterr = await MasterModel.findById(masterId);
        const all = req.master.uroven * req.uslugi.price;

        res.json(all);
    } catch (err) {
        return res.status(400).json({
            message: "Непредвиденная ошибка",
        });
    }
};*/

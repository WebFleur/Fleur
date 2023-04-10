import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import UslugiModel from "../models/Uslugi.js";
import UserModel from "../models/User.js";
import MasterModel from "../models/Master.js";

export const getUsluga = async (req, res) => {
    try {
        const uslugiId = req.params.id;
        const uslugi = await UslugiModel.findById(uslugiId);

        res.json(uslugi);
    } catch (err) {
        return res.status(400).json({
            message: "Непредвиденная ошибка",
        });
    }
};

export const getUslugi = async (req, res) => {
    try {
        const uslugi = await UslugiModel.find();

        res.json(uslugi);
    } catch (err) {
        return res.status(400).json({
            message: "Непредвиденная ошибка",
        });
    }
};

export const MasterUsl = async (req, res) => {
    try {
        const usl = await UslugiModel.findById(req.params.id).distinct(
            "people"
        );
        const masters = await MasterModel.find({
            myid: { $in: usl },
        });

        res.json(masters);
    } catch (err) {
        return res.status(400).json({
            message: "Непредвиденная ошибка",
        });
    }
};

import express from "express";

import mongoose from "mongoose";

import { registerValidation, loginValidation } from "./validations.js";

import checkAuth from "./utils/checkAuth.js";

import * as UserController from "./controllers/UserController.js";
import * as MasterController from "./controllers/MasterController.js";
import * as UslugiController from "./controllers/UslugiController.js";
import * as ZapisController from "./controllers/ZapisController.js";

mongoose
    .connect(
        "mongodb+srv://ansmekalina:wwwwww@cluster0.3vwluaq.mongodb.net/blog?retryWrites=true&w=majority"
    )
    .then(() => console.log("DB ok"))
    .catch((err) => console.log("DB error", err));

const app = express();

app.use(express.json()); //Для запроса email и пароля

app.post("/auth/login", loginValidation, UserController.login);
app.post("/auth/register", registerValidation, UserController.register);
app.get("/auth/me", checkAuth, UserController.getMe);
app.get("/user/view/zapisi", checkAuth, UserController.allzap);

app.post("/master/login", loginValidation, MasterController.login);
app.get("/user/view/master/:id", MasterController.getMaster);
app.get("/user/view/mastera", MasterController.getMastera);
app.get("/master/view/zapisi", checkAuth, MasterController.allzap);

app.get("/user/view/usluga/:id", UslugiController.getUsluga);
app.get("/user/view/uslugi", UslugiController.getUslugi);
app.get("/user/uslugi/masters/:id", checkAuth, UslugiController.MasterUsl);

app.post("/user/zapis/:id", checkAuth, ZapisController.zapros);
app.get("/user/okna/:id", checkAuth, ZapisController.Okna);

app.listen(4444, (err) => {
    if (err) {
        return console.log(err);
    }

    console.log("server ok");
});

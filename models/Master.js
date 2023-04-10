//структура таблицы списка пользователей
import mongoose from "mongoose";

const MasterSchema = mongoose.Schema(
    {
        //описываем свойства
        fullName: {
            type: String,
            required: true, //обязательно
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        passwordHash: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
            unique: true,
        },
        dolsnost: {
            type: String,
            required: true,
        },
        myid: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true, //дата создания\обновления
    }
);

export default mongoose.model("Master", MasterSchema);

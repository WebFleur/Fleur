//структура таблицы списка пользователей
import mongoose from "mongoose";

const UserSchema = mongoose.Schema(
    {
        //описываем свойства пользователя
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
    },
    {
        timestamps: true, //дата создания\обновления пользователя
    }
);

export default mongoose.model("User", UserSchema);

import mongoose from "mongoose";

const UslugiSchema = mongoose.Schema(
    {
        //описываем свойства
        fullName: {
            type: String,
            required: true, //обязательно
        },
        price: {
            type: Number,
            required: true,
        },
        time: {
            type: Number,
            required: true,
        },
        people: [
            {
                type: String,
                ref: "Master",
                required: true,
            },
        ],
    },
    {
        timestamps: true, //дата создания\обновления
    }
);

export default mongoose.model("Uslugi", UslugiSchema);

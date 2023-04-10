import mongoose from "mongoose";

const ZapisSchema = mongoose.Schema(
    {
        //описываем свойства
        data: {
            type: Number,
            required: true,
            unique: true,
        },
        /*time: {
            type: Number,
            required: true,
        },*/
        master: {
            type: String,
            required: true,
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        usluga: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Uslugi",
            required: true,
        },
    },
    {
        timestamps: true, //дата создания\обновления
    }
);

export default mongoose.model("Zapis", ZapisSchema);

import mongoose from "mongoose";

const foodSchema = new mongoose.Schema({
    name: { type: String, required: true },
    video: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    foodPartner: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "foodpartner",
    },
});

export const foodModel = mongoose.model("food", foodSchema);

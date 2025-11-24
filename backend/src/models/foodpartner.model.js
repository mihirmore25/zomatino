import mongoose from "mongoose";

const foodPartnerSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        contactName: {
            type: String,
            required: true,
        },
        phone: {
            type: String,
            required: true,
        },
        address: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: "food-partner",
            required: true,
        },
    },
    { timestamps: true }
);

export const foodPartnerModel = mongoose.model(
    "foodpartner",
    foodPartnerSchema
);

import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        fullName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
        },
        role: {
            type: String,
            default: "user",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);

export const userModel = mongoose.model("user", userSchema);

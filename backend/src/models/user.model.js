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
            required: false,  // Not required for Google OAuth users
        },
        googleId: {
            type: String,
            unique: true,
            sparse: true,  // Allows null values, only enforces uniqueness when present
        },
        provider: {
            type: String,
            enum: ['local', 'google'],
            default: 'local',
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

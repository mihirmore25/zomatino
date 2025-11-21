import { userModel } from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { foodPartnerModel } from "../models/foodpartner.model.js";

export async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
        email,
    });

    if (isUserAlreadyExists) {
        return res.status(400).json({
            status: false,
            message: "User already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword,
    });

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(201).json({
        status: true,
        message: "User registered successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        },
    });
}

export async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email,
    });

    if (!user) {
        res.status(400).json({
            status: false,
            message: "Invalid email or password",
        });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        res.status(400).json({
            status: false,
            message: "Invalid email or password",
        });
    }

    const token = jwt.sign(
        {
            id: user._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
        status: true,
        message: "User logged in successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
        },
    });
}

export async function logoutUser(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        status: true,
        message: "User logged out successfully",
    });
}

export async function registerFoodPartner(req, res) {
    const { name, contactName, phone, address, email, password } = req.body;

    const isAccountAlreadyExists = await foodPartnerModel.findOne({
        email,
    });

    if (isAccountAlreadyExists) {
        res.status(400).json({
            status: false,
            message: "Food partner account already exists",
        });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodpartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword,
        contactName,
        phone,
        address,
    });

    const token = jwt.sign(
        {
            id: foodpartner._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(201).json({
        status: true,
        message: "Food partner account registered successfully",
        foodpartner: {
            _id: foodpartner._id,
            name: foodpartner.name,
            email: foodpartner.email,
            contactName: foodpartner.contactName,
            phone: foodpartner.phone,
            address: foodpartner.address,
        },
    });
}

export async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const foodpartner = await foodPartnerModel.findOne({
        email,
    });

    if (!foodpartner) {
        res.status(400).json({
            status: false,
            message: "Invalid email or password",
        });
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        foodpartner.password
    );

    if (!isPasswordValid) {
        res.status(400).json({
            status: false,
            message: "Invalid email or password",
        });
    }

    const token = jwt.sign(
        {
            id: foodpartner._id,
        },
        process.env.JWT_SECRET
    );

    res.cookie("token", token);

    res.status(200).json({
        status: true,
        message: "Food partner logged in successfully",
        foodpartner: {
            _id: foodpartner._id,
            name: foodpartner.name,
            email: foodpartner.email,
            contactName: foodpartner.contactName,
            phone: foodpartner.phone,
            address: foodpartner.address,
        },
    });
}

export async function logoutFoodPartner(req, res) {
    res.clearCookie("token");
    res.status(200).json({
        status: true,
        message: "Food partner logged out successfully",
    });
}

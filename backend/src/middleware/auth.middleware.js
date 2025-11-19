import { foodPartnerModel } from "../models/foodpartner.model.js";
import { userModel } from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function authFoodPartnerMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized: No token provided, Please login first",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;

        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized: Invalid token",
        });
    }
}

export async function authUserMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized: No token provided, Please login first",
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        const user = await userModel.findById(decoded.id);

        req.user = user;
        next();
    } catch (error) {
        return res.status(401).json({
            status: false,
            message: "Unauthorized: Invalid token",
        });
    }
}

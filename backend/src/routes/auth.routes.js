import express from "express";
import {
    loginUser,
    logoutUser,
    registerUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
    getUserProfile,
    getFoodPartnerProfile,
} from "../controllers/auth.controller.js";
import { checkAuthMiddleware } from "../middleware/auth.middleware.js";

const router = express.Router();

// user auth APIs
router.post("/user/register", registerUser);
router.post("/user/login", loginUser);
router.get("/user/logout", logoutUser);
router.get("/user/profile", checkAuthMiddleware, getUserProfile);

//food-partner auth APIs
router.post("/food-partner/register", registerFoodPartner);
router.post("/food-partner/login", loginFoodPartner);
router.get("/food-partner/logout", logoutFoodPartner);
router.get("/food-partner/profile", checkAuthMiddleware, getFoodPartnerProfile);

// check auth - used by frontend ProtectedRoute
router.get("/check", checkAuthMiddleware, (req, res) => {
    // Middleware has already verified the token and populated req.entity and req.role
    const user = req.entity;
    const role = req.role;

    // Normalize response structure
    const userData = role === "user" ? {
        _id: user._id,
        email: user.email,
        fullName: user.fullName,
        role: user.role,
    } : {
        _id: user._id,
        name: user.name,
        email: user.email,
        contactName: user.contactName,
        phone: user.phone,
        address: user.address,
        role: user.role,
    };

    res.status(200).json({
        status: true,
        message: "Authenticated successfully",
        role: role,
        user: userData
    });
});

export default router;

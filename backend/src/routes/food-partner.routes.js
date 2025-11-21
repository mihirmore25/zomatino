import express from "express";
import { authFoodPartnerMiddleware } from "../middleware/auth.middleware.js";
import { getFoodPartnerById } from "../controllers/food-partner.controller.js";

const router = express.Router();

// GET /api/food-partner/:id [protected] get food partner by id
router.get("/:id", authFoodPartnerMiddleware, getFoodPartnerById);

export default router;

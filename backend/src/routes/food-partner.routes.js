import express from "express";
import { checkAuthMiddleware } from "../middleware/auth.middleware.js";
import { getFoodPartnerById } from "../controllers/food-partner.controller.js";

const router = express.Router();

// GET /api/food-partner/:id [protected] get food partner by id
router.get("/:id", checkAuthMiddleware, getFoodPartnerById);

export default router;

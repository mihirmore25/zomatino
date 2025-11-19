import express from "express";
import { createFood, getFoodItems } from "../controllers/food.controller.js";
import { authFoodPartnerMiddleware, authUserMiddleware } from "../middleware/auth.middleware.js";
import multer from "multer";
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

// POST /api/food/ [protected] create a food item
router.post("/", authFoodPartnerMiddleware, upload.single("video"), createFood);

// GET /api/food/ [protected] get all food items vidoes
router.get("/", authUserMiddleware, getFoodItems);

export default router;

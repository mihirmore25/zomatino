import express from "express";
import { createFood, getFoodItems, likeFood, saveFood, getSavedFood } from "../controllers/food.controller.js";
import { checkAuthMiddleware } from "../middleware/auth.middleware.js";
import multer from "multer";
const router = express.Router();

const upload = multer({
    storage: multer.memoryStorage(),
});

// POST /api/food/ [protected] create a food item
router.post("/", checkAuthMiddleware, upload.single("video"), createFood);

// GET /api/food/ [protected] get all food items vidoes
router.get("/", checkAuthMiddleware, getFoodItems);


// POST /like [protected] like a food item
router.post("/like", checkAuthMiddleware, likeFood);


// POST /save [protected] save a food item
router.post("/save", checkAuthMiddleware, saveFood);

// GET /save [protected] get all saved food items
router.get("/save", checkAuthMiddleware, getSavedFood);

export default router;

import { foodModel } from "../models/food.model.js";
import { v4 as uuid } from "uuid";
import { uploadFile } from "../services/storage.service.js";
import { saveModel } from "../models/save.model.js";
import { likeModel } from "../models/likes.model.js";

export async function createFood(req, res) {
    console.log("Req entity: ", req.entity);

    console.log("Req body: ", req.body);

    console.log("Req File: ", req.file);

    const fileUploadResult = await uploadFile(
        req.file.buffer.toString("base64"),
        uuid()
    );
    console.log(fileUploadResult);

    const foodItem = await foodModel.create({
        name: req.body.name,
        description: req.body.description,
        video: fileUploadResult.url,
        foodPartner: req.entity._id,
    });

    console.log(foodItem);

    res.status(201).json({
        message: "Food item created successfully",
        food: foodItem,
    });
}

export async function getFoodItems(req, res) {
    const foodItems = await foodModel.find({});

    res.status(200).json({
        message: "Food items fetched successfully",
        foods: foodItems,
    });
}

export async function likeFood(req, res) {
    const { foodId } = req.body;
    const user = req.entity;
    console.log("User: ", user);
    console.log("Req body: ", req.body);

    if (!foodId) {
        return res.status(400).json({
            status: false,
            message: "foodId is required",
        });
    }

    const isAlreadyLiked = await likeModel.findOne({
        user: user._id,
        food: foodId,
    });

    if (isAlreadyLiked) {
        await likeModel.deleteOne({
            user: user._id,
            food: foodId,
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { likesCount: -1 },
        });

        return res.status(200).json({
            status: true,
            message: "Food unliked successfully",
        });
    }

    const like = await likeModel.create({
        user: user._id,
        food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { likesCount: 1 },
    });

    res.status(201).json({
        status: true,
        message: "Food liked successfully",
        like: like,
    });
}

export async function saveFood(req, res) {
    const { foodId } = req.body;
    const user = req.entity;
    console.log("Req body: ", req.body);

    if (!foodId) {
        return res.status(400).json({
            status: false,
            message: "foodId is required",
        });
    }

    const isAlreadySaved = await saveModel.findOne({
        user: user._id,
        food: foodId,
    });

    if (isAlreadySaved) {
        await saveModel.deleteOne({
            user: user._id,
            food: foodId,
        });

        await foodModel.findByIdAndUpdate(foodId, {
            $inc: { savesCount: -1 },
        });

        return res.status(200).json({
            status: true,
            message: "Food unsaved successfully",
        });
    }

    const save = await saveModel.create({
        user: user._id,
        food: foodId,
    });

    await foodModel.findByIdAndUpdate(foodId, {
        $inc: { savesCount: 1 },
    });

    res.status(201).json({
        status: true,
        message: "Food saved successfully",
        save: save,
    });
}


export async function getSavedFood(req, res) {
    const user = req.entity;

    const savedFood = await saveModel.find({ user: user._id }).populate("food");

    if (!savedFood || savedFood.length === 0) {
        return res.status(200).json({
            status: false,
            message: "No saved food found",
        });
    }

    res.status(200).json({
        status: true,
        message: "Saved food fetched successfully",
        savedFoods: savedFood,
    });
}
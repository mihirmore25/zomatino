import { foodModel } from "../models/food.model.js";
import { v4 as uuid } from "uuid";
import { uploadFile } from "../services/storage.service.js";

export async function createFood(req, res) {
    console.log("Req foodpartner: ", req.foodPartner);

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
        foodPartner: req.foodPartner._id,
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

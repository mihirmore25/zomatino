// We create server here
import express from "express";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import authRoutes from "./routes/auth.routes.js";
import foodRoutes from "./routes/food.routes.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/food", foodRoutes);

app.get("/", (req, res) => {
    res.send("Hello World");
});

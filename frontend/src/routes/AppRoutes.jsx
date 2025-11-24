import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import UserRegister from "../pages/auth/UserRegister";
import UserLogin from "../pages/auth/UserLogin";
import PartnerRegister from "../pages/auth/PartnerRegister";
import PartnerLogin from "../pages/auth/PartnerLogin";
import HomeReels from "../pages/general/HomeReels";
import Saved from "../pages/general/Saved";
import Profile from "../pages/food-partner/Profile";
import UserProfile from "../pages/general/UserProfile";
import FoodPartnerProfile from "../pages/food-partner/FoodPartnerProfile";
import CreateFood from "../pages/food-partner/CreateFood";
import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
    return (
        <Routes>
            <Route path="/user/register" element={<UserRegister />} />
            <Route path="/user/login" element={<UserLogin />} />
            <Route
                path="/food-partner/register"
                element={<PartnerRegister />}
            />
            <Route path="/food-partner/login" element={<PartnerLogin />} />

            <Route element={<ProtectedRoute />}>
                <Route path="/" element={<HomeReels />} />
                <Route path="/saved" element={<Saved />} />
                <Route path="/user/profile" element={<UserProfile />} />
                <Route path="/food-partner/me" element={<FoodPartnerProfile />} />
                <Route path="/create-food" element={<CreateFood />} />
            </Route>

            <Route path="/food-partner/:id" element={<Profile />} />
        </Routes>
    );
}

export default AppRoutes;

import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

function AuthSwitch() {
    const { pathname } = useLocation();
    const isUser = pathname.includes("/user");
    return (
        <div className="auth-switch">
            <span className="switch-label">Switch</span>
            <nav className="switch-nav">
                <Link
                    className={isUser ? "switch-link" : "switch-link active"}
                    to="/user/register"
                >
                    User
                </Link>
                <Link
                    className={!isUser ? "switch-link active" : "switch-link"}
                    to="/food-partner/register"
                >
                    Food-Partner
                </Link>
            </nav>
        </div>
    );
}

export default function PartnerRegister() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.name.value.trim();
        const contactName = e.target.contactName.value.trim();
        const phone = e.target.phone.value.trim();
        const email = e.target.email.value.trim();
        const address = e.target.address.value.trim();
        const password = e.target.password.value.trim();

        const response = await axios.post(
            "http://localhost:3000/api/auth/food-partner/register",
            {
                name,
                contactName,
                phone,
                email,
                address,
                password,
            },
            { withCredentials: true }
        );

        console.log(response.data);
        localStorage.setItem("role", response.data.foodpartner.role);

        navigate("/create-food");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <AuthSwitch />
                <h2 className="auth-title">Partner signup</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="form-row">
                        <span className="label">Business name</span>
                        <input name="name" placeholder="Tasty Bites" />
                    </label>

                    <div className="form-row two-cols">
                        <label>
                            <span className="label">Contact name</span>
                            <input name="contactName" placeholder="Jane Doe" />
                        </label>
                        <label>
                            <span className="label">Contact phone</span>
                            <input name="phone" placeholder="+155 6785" />
                        </label>
                    </div>

                    <label className="form-row">
                        <span className="label">Email</span>
                        <input name="email" placeholder="test@example.com" />
                    </label>

                    <label className="form-row">
                        <span className="label">Address</span>
                        <input name="address" placeholder="123 street, city" />
                    </label>

                    <label className="form-row">
                        <span className="label">Password</span>
                        <input name="password" type="password" placeholder="password" />
                    </label>

                    <div className="form-row">
                        <button className="btn primary" type="submit">
                            Create account
                        </button>
                    </div>

                    <div className="form-footer">
                        <span>Already a partner?</span>
                        <Link to="/food-partner/login" className="link">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

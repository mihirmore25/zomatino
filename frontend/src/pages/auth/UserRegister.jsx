import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function AuthSwitch() {
    const { pathname } = useLocation();
    const isUser = pathname.includes("/user");

    return (
        <div className="auth-switch">
            <span className="switch-label">Switch</span>
            <nav className="switch-nav">
                <Link
                    className={isUser ? "switch-link active" : "switch-link"}
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

export default function UserRegister() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const fullName = e.target.fullName.value.trim();
        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        const response = await axios.post(
            "http://localhost:3000/api/auth/user/register",
            {
                fullName,
                email,
                password,
            },
            {
                withCredentials: true,
            }
        );

        console.log(response.data);
        localStorage.setItem("role", response.data.user.role);

        navigate("/");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <AuthSwitch />
                <h2 className="auth-title">Create account</h2>
                <form className="auth-form" onSubmit={handleSubmit} noValidate>
                    <label className="form-row">
                        <span className="label">Full name</span>
                        <input name="fullName" placeholder="Jane Doe" />
                    </label>

                    <label className="form-row">
                        <span className="label">Email</span>
                        <input name="email" placeholder="test@example.com" />
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
                        <span>Already have an account?</span>
                        <Link to="/user/login" className="link">
                            Log in
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

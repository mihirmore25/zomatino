import e from "cors";
import React from "react";
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

export default function PartnerLogin() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        const response = await axios.post(
            "http://localhost:3000/api/auth/food-partner/login",
            {
                email,
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
                <h2 className="auth-title">Partner login</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
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
                            Log in
                        </button>
                    </div>
                    <div className="form-footer">
                        <span>Don't have an account?</span>
                        <Link to="/food-partner/register" className="link">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

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

export default function UserLogin() {
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.email.value.trim();
        const password = e.target.password.value.trim();

        const response = await axios.post(
            "http://localhost:3000/api/auth/user/login",
            { email, password },
            { withCredentials: true }
        );

        console.log(response.data);
        localStorage.setItem("role", response.data.user.role);

        navigate("/");
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <AuthSwitch />
                <h2 className="auth-title">Welcome back</h2>
                <form className="auth-form" onSubmit={handleSubmit}>
                    <label className="form-row">
                        <span className="label">Email</span>
                        <input name="email" placeholder="test@example.com" />
                    </label>
                    <label className="form-row">
                        <span className="label">Password</span>
                        <input name="password" type="password" placeholder="password" />
                    </label>

                    {/* Google OAuth Button */}
                    <div className="form-row">
                        <button
                            type="button"
                            className="btn google-btn"
                            onClick={() => window.location.href = 'http://localhost:3000/api/auth/google'}
                            style={{
                                width: '100%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                gap: '10px',
                                backgroundColor: 'white',
                                color: '#333',
                                border: '1px solid #ddd',
                                padding: '12px 24px',
                                borderRadius: '8px',
                                cursor: 'pointer',
                                fontSize: '14px',
                                fontWeight: '500',
                                transition: 'all 0.2s'
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#f8f8f8'}
                            onMouseOut={(e) => e.target.style.backgroundColor = 'white'}
                        >
                            <svg width="18" height="18" viewBox="0 0 18 18">
                                <path fill="#4285F4" d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" />
                                <path fill="#34A853" d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332C2.438 15.983 5.482 18 9 18z" />
                                <path fill="#FBBC05" d="M3.964 10.707c-.18-.54-.282-1.117-.282-1.707 0-.593.102-1.17.282-1.709V4.958H.957C.347 6.173 0 7.548 0 9c0 1.452.348 2.827.957 4.042l3.007-2.335z" />
                                <path fill="#EA4335" d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0 5.482 0 2.438 2.017.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" />
                            </svg>
                            Continue with Google
                        </button>
                    </div>

                    {/* Divider */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        margin: '20px 0',
                        color: 'var(--muted)'
                    }}>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
                        <span style={{ padding: '0 16px', fontSize: '14px' }}>OR</span>
                        <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--border)' }}></div>
                    </div>

                    <div className="form-row">
                        <button className="btn primary" type="submit">
                            Log in
                        </button>
                    </div>
                    <div className="form-footer">
                        <span>Don't have an account?</span>
                        <Link to="/user/register" className="link">
                            Register
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/reels.css";

export default function ProfileDropdown() {
    const [isOpen, setIsOpen] = useState(false);
    const [user, setUser] = useState(null);
    const [userType, setUserType] = useState(null); // 'user' or 'food-partner'
    const navigate = useNavigate();

    // Fetch user info when dropdown is opened or component mounts
    React.useEffect(() => {
        axios.get("http://localhost:3000/api/auth/check", { withCredentials: true })
            .then(response => {
                setUser(response.data.user);
                setUserType(response.data.role);
            })
            .catch(err => console.log("Not logged in"));
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    const handleLogout = async () => {
        const logoutUrl = userType === 'food-partner'
            ? "http://localhost:3000/api/auth/food-partner/logout"
            : "http://localhost:3000/api/auth/user/logout";

        try {
            await axios.get(logoutUrl, { withCredentials: true });
        } catch (error) {
            console.error("Logout failed", error);
        } finally {
            setUser(null);
            setUserType(null);
            localStorage.removeItem("role");
            navigate(userType === 'food-partner' ? "/food-partner/login" : "/user/login");
        }
    };

    return (
        <div className="profile-dropdown-container">
            <button className="profile-btn" onClick={toggleDropdown}>
                {/* Pseudo profile image */}
                <div className="profile-avatar">
                    <span>{userType === "user" ? user?.fullName ? user.fullName.charAt(0).toUpperCase() : "U" : user?.name ? user.name.charAt(0).toUpperCase() : "P"}</span>
                </div>
            </button>

            {isOpen && (
                <div className="dropdown-menu">
                    {user && (
                        <div className="dropdown-header" style={{ padding: "8px 16px", borderBottom: "1px solid var(--border)", marginBottom: "4px" }}>
                            <div style={{ fontWeight: "bold", color: "var(--text)" }}>{userType === "user" ? user?.fullName : user?.name}</div>
                            <div style={{ fontSize: "12px", color: "var(--muted)" }}>{user.email}</div>
                        </div>
                    )}
                    <Link
                        to={userType === 'food-partner' ? "/food-partner/me" : "/user/profile"}
                        className="dropdown-item"
                        onClick={() => setIsOpen(false)}
                    >
                        Profile
                    </Link>
                    <button className="dropdown-item logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            )}
        </div>
    );
}

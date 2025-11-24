import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import axios from "axios";

const UserProfile = () => {
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Fetch user profile
        axios
            .get("http://localhost:3000/api/auth/user/profile", {
                withCredentials: true,
            })
            .then((response) => {
                setProfile(response.data.user);
            })
            .catch((err) => console.error("Failed to fetch profile", err));

        // Fetch saved videos
        axios
            .get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then((response) => {
                const savedFoods = response.data.savedFoods.map((item) => ({
                    _id: item.food._id,
                    video: item.food.video,
                    description: item.food.description,
                    likesCount: item.food.likesCount,
                    savesCount: item.food.savesCount,
                    foodPartner: item.food.foodPartner,
                }));
                setVideos(savedFoods);
            })
            .catch((err) => console.error("Failed to fetch saved videos", err));
    }, []);

    if (!profile) {
        return <div style={{ color: "var(--text)", textAlign: "center", marginTop: "50px" }}>Loading...</div>;
    }

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-top">
                    <div
                        className="avatar"
                        aria-hidden="true"
                        style={{
                            backgroundColor: "var(--accent)",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            color: "white",
                            fontSize: "40px",
                            fontWeight: "bold"
                        }}
                    >
                        {profile.fullName ? profile.fullName.charAt(0).toUpperCase() : "U"}
                    </div>

                    <div className="profile-right">
                        <div className="pills">
                            <div className="pill">{profile.fullName}</div>
                            <div className="pill">{profile.email}</div>
                        </div>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="stat">
                        <div className="stat-label">saved videos</div>
                        <div className="stat-value">{videos.length}</div>
                    </div>
                </div>

                <div className="video-grid">
                    {videos.map((v) => (
                        <video
                            key={v._id}
                            className="video-thumb"
                            src={v.video}
                            muted
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default UserProfile;

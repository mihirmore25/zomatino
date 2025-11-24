import React, { useState, useEffect } from "react";
import "../../styles/profile.css";
import axios from "axios";

const FoodPartnerProfile = () => {
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        // Fetch food partner profile
        axios
            .get("http://localhost:3000/api/auth/food-partner/profile", {
                withCredentials: true,
            })
            .then((response) => {
                const partner = response.data.foodpartner;
                setProfile(partner);

                // After getting profile, fetch their public profile to get the foods
                // This is a workaround since the auth profile endpoint doesn't return foods yet
                // and we want to reuse the existing public endpoint logic if possible.
                // Alternatively, we could update the backend to return foods in the auth profile.
                if (partner._id) {
                    axios.get(`http://localhost:3000/api/food-partner/${partner._id}`, { withCredentials: true })
                        .then(res => {
                            if (res.data.foodPartner && res.data.foodPartner.foodItems) {
                                setVideos(res.data.foodPartner.foodItems);
                            }
                        })
                        .catch(err => console.error("Failed to fetch foods", err));
                }
            })
            .catch((err) => console.error("Failed to fetch profile", err));
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
                        {profile.name ? profile.name.charAt(0).toUpperCase() : "P"}
                    </div>

                    <div className="profile-right">
                        <div className="pills">
                            <div className="pill">{profile.name}</div>
                            <div className="pill">{profile.email}</div>
                            <div className="pill">{profile.address}</div>
                        </div>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="stat">
                        <div className="stat-label">uploaded videos</div>
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

export default FoodPartnerProfile;

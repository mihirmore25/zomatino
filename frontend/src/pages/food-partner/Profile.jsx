import React from "react";
import { useState, useEffect } from "react";
import "../../styles/profile.css";
import { useParams } from "react-router-dom";
import axios from "axios";

const Profile = () => {
    const { id } = useParams();
    const [profile, setProfile] = useState(null);
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios
            .get(`http://localhost:3000/api/food-partner/${id}`, {
                withCredentials: true,
            })
            .then((response) => {
                setProfile(response.data.foodPartner);
                setVideos(response.data.foodPartner.foodItems);
            });
    }, [id]);

    return (
        <div className="profile-page">
            <div className="profile-card">
                <div className="profile-top">
                    <div
                        className="avatar"
                        aria-hidden="true"
                        style={{
                            backgroundImage: `url(${
                                profile?.avatar ||
                                "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=60"
                            })`,
                        }}
                    />

                    <div className="profile-right">
                        <div className="pills">
                            <div className="pill">{profile?.name}</div>
                            <div className="pill">{profile?.address}</div>
                        </div>
                    </div>
                </div>

                <div className="profile-stats">
                    <div className="stat">
                        <div className="stat-label">total meals</div>
                        <div className="stat-value">43</div>
                    </div>
                    <div className="stat">
                        <div className="stat-label">customer serve</div>
                        <div className="stat-value">16k</div>
                    </div>
                </div>

                <div className="video-grid">
                    {videos.map((v) => (
                        // <div
                        //     className="video-thumb"
                        //     key={i}
                        //     style={{ backgroundImage: `url(${v.video})` }}
                        // />
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

export default Profile;

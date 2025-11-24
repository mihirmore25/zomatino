import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../styles/reels.css";
import axios from "axios";
import ReelItem from "../../components/ReelItem";
import ProfileDropdown from "../../components/ProfileDropdown";

export default function Saved() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/food/save", { withCredentials: true })
            .then(response => {
                if (response.data.savedFoods && response.data.savedFoods.length > 0) {
                    const savedFoods = response.data.savedFoods.map((item) => ({
                        _id: item.food._id,
                        video: item.food.video,
                        description: item.food.description,
                        likesCount: item.food.likesCount,
                        savesCount: item.food.savesCount,
                        foodPartner: item.food.foodPartner,
                    }));
                    setVideos(savedFoods);
                } else {
                    setVideos([]);
                }
            })
            .catch(error => {
                console.error("Error fetching saved foods:", error);
                setVideos([]);
            });
    }, []);

    return (
        <>
            <ProfileDropdown />
            <div className="reels-container">
                {videos.length > 0 ? (
                    videos.map((video) => (
                        <ReelItem key={video._id} video={video} />
                    ))
                ) : (
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', color: 'var(--text)' }}>
                        <p>No saved videos yet.</p>
                    </div>
                )}
            </div>

            {/* Bottom Navigation */}
            <div className="bottom-nav">
                <Link to="/" className="nav-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Home</span>
                </Link>
                <Link to="/saved" className="nav-item active">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Saved</span>
                </Link>
            </div>
        </>
    );
}

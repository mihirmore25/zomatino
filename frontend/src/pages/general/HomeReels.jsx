import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../../styles/reels.css";
import ReelItem from "../../components/ReelItem";
import ProfileDropdown from "../../components/ProfileDropdown";

export default function HomeReels() {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios
            .get("http://localhost:3000/api/food", { withCredentials: true })
            .then((response) => {
                console.log(response.data);
                setVideos(response.data.foods);
            });
    }, []);

    return (
        <>
            <ProfileDropdown />
            <div className="reels-container">
                {videos.map((video) => (
                    <ReelItem key={video._id} video={video} />
                ))}
            </div>

            {/* Bottom Navigation */}
            <div className="bottom-nav">
                <Link to="/" className="nav-item active">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                    </svg>
                    <span>Home</span>
                </Link>
                <Link to="/saved" className="nav-item">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                    <span>Saved</span>
                </Link>
            </div>
        </>
    );
}

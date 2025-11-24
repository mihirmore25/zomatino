import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../styles/reels.css";

export default function ReelItem({ video }) {
    const videoRef = useRef(null);
    const [likesCount, setLikesCount] = useState(video.likesCount || 0);
    const [savesCount, setSavesCount] = useState(video.savesCount || 0);

    useEffect(() => {
        const vid = videoRef.current;
        if (!vid) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.75) {
                        vid.play().catch(() => { });
                    } else {
                        vid.pause();
                    }
                });
            },
            { threshold: [0.25, 0.5, 0.75, 1] }
        );

        observer.observe(vid);

        return () => {
            if (vid) observer.unobserve(vid);
            observer.disconnect();
        };
    }, []);

    async function handleLike() {
        try {
            const response = await axios.post("http://localhost:3000/api/food/like", { foodId: video._id }, { withCredentials: true });
            if (response.data.like) {
                setLikesCount(prev => prev + 1);
            } else {
                setLikesCount(prev => prev - 1);
            }
        } catch (error) {
            console.error("Error liking video:", error);
        }
    }

    async function handleSave() {
        try {
            const response = await axios.post("http://localhost:3000/api/food/save", { foodId: video._id }, { withCredentials: true });
            if (response.data.save) {
                setSavesCount(prev => prev + 1);
            } else {
                setSavesCount(prev => prev - 1);
            }
        } catch (error) {
            console.error("Error saving video:", error);
        }
    }

    return (
        <section className="reel">
            <video
                ref={videoRef}
                src={video.video}
                muted
                playsInline
                loop
                className="reel-video"
                poster=""
                preload="metadata"
            />

            <div className="reel-overlay">
                {/* Right Sidebar Actions */}
                <div className="reel-right">
                    <button className="action-btn" onClick={handleLike}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
                        </svg>
                        <span className="action-count">{likesCount}</span>
                    </button>
                    <button className="action-btn" onClick={handleSave}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                        </svg>
                        <span className="action-count">{savesCount}</span>
                    </button>
                    <button className="action-btn">
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
                        </svg>
                        <span className="action-count">0</span>
                    </button>
                </div>

                <div className="reel-bottom">
                    <div className="reel-meta">
                        <div className="reel-description">
                            {video.description}
                        </div>
                    </div>
                    <Link
                        className="visit-btn"
                        to={"/food-partner/" + video.foodPartner}
                    >
                        Visit store
                    </Link>
                </div>
            </div>
        </section>
    );
}

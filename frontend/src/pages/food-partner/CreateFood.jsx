import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/createfood.css";
import axios from "axios";

export default function CreateFood() {
    const [videoFile, setVideoFile] = useState(null);
    const [videoPreview, setVideoPreview] = useState(null);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const inputRef = useRef(null);

    const navigate = useNavigate();

    function handleVideoChange(e) {
        const f = e.target.files && e.target.files[0];
        if (f) {
            const url = URL.createObjectURL(f);
            setVideoFile(f);
            setVideoPreview(url);
        } else {
            setVideoFile(null);
            setVideoPreview(null);
        }
    }

    function clearVideo() {
        setVideoFile(null);
        setVideoPreview((prev) => {
            if (prev) URL.revokeObjectURL(prev);
            return null;
        });
        if (inputRef.current) inputRef.current.value = "";
    }

    useEffect(() => {
        return () => {
            // cleanup on unmount
            if (videoPreview) URL.revokeObjectURL(videoPreview);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    async function handleSubmit(e) {
        e.preventDefault();
        console.log("CreateFood payload", { name, description, videoFile });

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("video", videoFile);

        const response = await axios.post(
            "http://localhost:3000/api/food",
            formData,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            }
        );

        console.log(response.data);
        navigate("/");
    }

    return (
        <div className="create-page">
            <div className="create-card">
                <h2 className="create-title">Create food item</h2>

                <form className="create-form" onSubmit={handleSubmit}>
                    <div className="field">
                        <span className="field-label">Video</span>
                        <label
                            htmlFor="video-input"
                            className="video-input"
                            tabIndex={0}
                        >
                            <svg
                                className="video-icon"
                                width="48"
                                height="48"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                aria-hidden
                            >
                                <path
                                    d="M17 10.5V6a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v12c0 1.1.9 2 2 2h10a2 2 0 0 0 2-2v-4.5l4 4v-11l-4 4z"
                                    fill="currentColor"
                                />
                            </svg>
                            <div className="video-input-text">
                                <div className="video-input-title">
                                    Add video
                                </div>
                                <div className="video-input-sub">
                                    MP4, MOV — max 50MB
                                </div>
                            </div>
                        </label>
                        <input
                            id="video-input"
                            type="file"
                            accept="video/*"
                            onChange={handleVideoChange}
                            ref={inputRef}
                            className="input-file-hidden"
                        />
                    </div>

                    {videoPreview && (
                        <div className="video-preview">
                            <video
                                src={videoPreview}
                                controls
                                playsInline
                                preload="metadata"
                                className="preview-video"
                            />
                            <div className="preview-controls">
                                <button
                                    type="button"
                                    className="btn tiny"
                                    onClick={() =>
                                        inputRef.current &&
                                        inputRef.current.click()
                                    }
                                >
                                    Change
                                </button>
                                <button
                                    type="button"
                                    className="btn tiny muted"
                                    onClick={clearVideo}
                                >
                                    Remove
                                </button>
                            </div>
                        </div>
                    )}

                    <label className="field">
                        <span className="field-label">Name</span>
                        <input
                            className="input"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Paneer Tikka"
                            required
                        />
                    </label>

                    <label className="field">
                        <span className="field-label">Description</span>
                        <textarea
                            className="input textarea"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Short description (max 2 lines)"
                            rows={3}
                        />
                    </label>

                    <div className="form-actions">
                        <button className="btn primary" type="submit">
                            Create
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

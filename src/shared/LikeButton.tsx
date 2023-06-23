import React, { useState, useEffect } from "react";
import "./LikeButton.css";

export const LikeButton = () => {
  const [countLike, setCountLike] = useState(0);
  const [countDislike, setCountDislike] = useState(0);
  const [activeBtn, setActiveBtn] = useState("none");

  useEffect(() => {
    const savedActiveBtn = localStorage.getItem("activeBtn");
    const savedCountLike = localStorage.getItem("countLike");
    const savedCountDislike = localStorage.getItem("countDislike");

    if (savedActiveBtn && savedCountLike && savedCountDislike) {
      setActiveBtn(savedActiveBtn);
      setCountLike(parseInt(savedCountLike));
      setCountDislike(parseInt(savedCountDislike));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("activeBtn", activeBtn);
    localStorage.setItem("countLike", JSON.stringify(countLike));
    localStorage.setItem("countDislike", JSON.stringify(countDislike));
  }, [activeBtn, countLike, countDislike]);

  const handleLikeClick = () => {
    if (activeBtn === "none") {
      setCountLike(countLike + 1);
      setActiveBtn("like");
      return;
    }

    if (activeBtn === "like") {
      setCountLike(countLike - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "dislike") {
      setCountLike(countLike + 1);
      setCountDislike(countDislike - 1);
      setActiveBtn("like");
    }
  };

  const handleDislikeClick = () => {
    if (activeBtn === "none") {
      setCountDislike(countDislike + 1);
      setActiveBtn("dislike");
      return;
    }

    if (activeBtn === "dislike") {
      setCountDislike(countDislike - 1);
      setActiveBtn("none");
      return;
    }

    if (activeBtn === "like") {
      setCountDislike(countDislike + 1);
      setCountLike(countLike - 1);
      setActiveBtn("dislike");
    }
  };

  return (
    <div className="containerBtn">
      <button
        onClick={handleLikeClick}
        className={activeBtn === "like" ? "activeBtn" : ""}
      >
        Like {countLike}
      </button>
      <button
        onClick={handleDislikeClick}
        className={activeBtn === "dislike" ? "activeBtn" : ""}
      >
        Dislike {countDislike}
      </button>
    </div>
  );
};

export default LikeButton;

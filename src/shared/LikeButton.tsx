import React, { useState } from "react";
import './LikeButton.css';


export const LikeButton = () => {
const [countLike, setCountLike] = useState(0);
const [countDislike, setCountDislike] = useState(0);
const [activeBtn, setActiveBtn] = useState("none");

const handleLikeClick = () => {
    if(activeBtn === "none") {
        setCountLike(countLike + 1);
        setActiveBtn("like")
        return
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
}

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
}

return (
    <div className="containerBtn">
        <button onClick={handleLikeClick} className="activeBtn">Like {countLike}</button>
        <button onClick={handleDislikeClick} className="activeBtn">Dislike {countDislike}</button>
    </div>
)
}

export default {};
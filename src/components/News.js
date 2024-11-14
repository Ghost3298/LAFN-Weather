import React from "react";

const News = ({ title, imgSrc, text }) => {
    return(
        <div className="NewsCard">
            <img src={imgSrc} alt={title} />
            <div className="NewsCardBody">
                <h4>{title}</h4>
                <p>{text}</p>
            </div>
        </div>
    )
};

export default News;
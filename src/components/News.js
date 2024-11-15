import React, { useState } from "react";

const News = ({ title, imgSrc, text, details }) => {
  const [showModal, setShowModal] = useState(false);

  const handleModalOpen = () => {
    setShowModal(true);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <div>
      <div className="NewsCard" onClick={handleModalOpen}>
        <img src={imgSrc} alt={title} />
        <div className="NewsCardBody">
          <h4>{title}</h4>
          <p>{text}</p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={imgSrc} alt={title} />
            <h4>{title}</h4>
            <p>{details}</p>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;

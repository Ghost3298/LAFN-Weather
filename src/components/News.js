import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const News = ({ newsItem }) => {
  const [showModal, setShowModal] = useState(false);
  const { i18n } = useTranslation();

  // Safely access the content for the current language
  const content = newsItem[i18n.language];

  if (!content) {
    return <div>Error: Content for the selected language is not available.</div>;
  }

  const handleModalOpen = () => setShowModal(true);
  const handleModalClose = () => setShowModal(false);

  return (
    <div>
      <div className="NewsCard" onClick={handleModalOpen}>
        <img src={content.imgSrc} alt={content.title} />
        <div className="NewsCardBody">
          <h4>{content.title}</h4>
          <p>{content.text}</p>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={handleModalClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <img src={content.imgSrc} alt={content.title} />
            <h4>{content.title}</h4>
            <p>{content.details}</p>
            <button onClick={handleModalClose}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default News;

import React from "react";
import { useLocation } from "react-router-dom";

const PageFeatured = (props) => {
  const location = useLocation();

  const displayedPage = () => {
    switch (location.pathname) {
      case "/messages":
        return "Messages";
      case "/discover":
        return "Discover";
      case "/":
        return "Discover";
      default:
        break;
    }
  };

  return (
    <div>
      <div className="bg-dark shadow-sm mb-2 p-3">
        <div className="container">
          <h2 className="text-white">{displayedPage()}</h2>
        </div>
      </div>
    </div>
  );
};

export default PageFeatured;

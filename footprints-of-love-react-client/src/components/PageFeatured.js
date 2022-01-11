import React from "react";
import { useLocation } from "react-router-dom";

const PageFeatured = (props) => {
  const location = useLocation();

  const findTerm = (term) => {
    if (location.pathname.includes(term)) {
      return location.pathname;
    }
  };

  const displayedPage = () => {
    switch (location.pathname) {
      case findTerm("/messages"):
        return "Messages";
      case findTerm("/discover"):
        return "Discover";
      case findTerm("/likes"):
        return "Likes";
      case "/":
        return "Discover";
      default:
        break;
    }
  };

  return (
    <div>
      <div className="bg-dark shadow-sm p-3">
        <div className="container">
          <h2 className="text-white">{displayedPage()}</h2>
        </div>
      </div>
    </div>
  );
};

export default PageFeatured;

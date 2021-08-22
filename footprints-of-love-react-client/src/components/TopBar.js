import React from "react";
import logo from "../assets/footprints-of-love-logo.png";

const TopBar = () => {
  return (
    <div className="bg-dark shadow-sm mb-2">
      <div className="container">
        <nav className="navbar navbar-dark bg-dark navbar-expand">
          <a className="navbar-brand">
            <img src={logo} width="60" alt="Footprints of Love" />
            Footprints of Love
          </a>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;

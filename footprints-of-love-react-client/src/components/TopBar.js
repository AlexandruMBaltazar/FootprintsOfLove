import React from "react";
import logo from "../assets/footprints-of-love-logo.png";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <div className="bg-dark shadow-sm mb-2">
      <div className="container">
        <nav className="navbar navbar-dark bg-dark navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="60" alt="Footprints of Love" />
            Footprints of Love
          </Link>

          <ul className="nav navbar-nav ms-auto">
            <li className="nav-item">
              <Link to="/signup" className="nav-link">
                Sign Up
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default TopBar;

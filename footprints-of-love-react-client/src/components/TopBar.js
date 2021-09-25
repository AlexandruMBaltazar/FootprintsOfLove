import React from "react";
import logo from "../assets/footprints-of-love-logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as authActions from "../actions/auth/authActions";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const TopBar = (props) => {
  let links = (
    <div className="w-100">
      <ul className="nav navbar-nav float-end">
        <li className="nav-item">
          <Link
            to="/signup"
            className="nav-link btn btn-warning text-dark px-5 me-4"
          >
            Join Now
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/login"
            className="nav-link btn btn-outline-warning text-white px-5"
          >
            Login
          </Link>
        </li>
      </ul>
    </div>
  );

  if (props.user.isLoggedIn) {
    links = (
      <ul className="nav navbar-nav w-100">
        <li className="nav-item align-self-center ms-1">
          <Link to="/discover" className="nav-link align-self-center">
            <div>
              <svg
                width="19"
                height="19"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="navbar-link-icon isSelected"
              >
                <g id="doubletake-icon-Symbols" fill="none" fillRule="evenodd">
                  <g
                    id="doubletake-icon-Icon/DoubleTake/24"
                    fill="#FFFFFF8C"
                    fillRule="nonzero"
                  >
                    <path
                      d="M23.25 0a.75.75 0 0 1 .75.75v16.5a.75.75 0 0 1-.75.75H18v5.25a.75.75 0 0 1-.648.743L17.25 24H.75a.75.75 0 0 1-.75-.75V6.75A.75.75 0 0 1 .75 6H6V.75A.75.75 0 0 1 6.75 0h16.5zM6 7.5H1.5v15h15V18H6.75a.75.75 0 0 1-.75-.75V7.5zm16.5-6h-15l-.001 5.235.001.015v9.75h.495a7.043 7.043 0 0 1 3.188-5.172 4.5 4.5 0 1 1 7.634.002 7.035 7.035 0 0 1 3.188 5.17h.495v-15zm-4.697 10.965l-.145.113a4.48 4.48 0 0 1-2.658.869 4.48 4.48 0 0 1-2.804-.98 5.54 5.54 0 0 0-2.69 4.033h10.988a5.545 5.545 0 0 0-2.69-4.035zM15 5.947a3 3 0 1 0 0 6 3 3 0 0 0 0-6z"
                      id="doubletake-icon-Combined-Shape"
                    ></path>
                  </g>
                </g>
              </svg>
              <span className="ps-2">Discover</span>
            </div>
          </Link>
        </li>
        <li className="nav-item ms-auto align-self-center">
          <div>
            <Link
              to="/profile"
              className="text-decoration-none text-white bg-dark"
            >
              <ProfileImageWithDefault
                className="rounded-circle m-auto"
                width="32"
                height="32"
                src={
                  props.user.profile_photo
                    ? `/${props.user.profile_photo.location}`
                    : null
                }
              />
              <span className="ps-1">{props.user.first_name}</span>
            </Link>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <div className="bg-dark shadow-sm mb-2">
      <div className="container mb-0 pb-0">
        <nav className="navbar navbar-dark bg-dark navbar-expand">
          <Link to="/" className="navbar-brand">
            <img src={logo} width="60" alt="Footprints of Love" />
            Footprints of Love
          </Link>
          {links}
        </nav>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      logout: () => dispatch(authActions.logout()),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TopBar);

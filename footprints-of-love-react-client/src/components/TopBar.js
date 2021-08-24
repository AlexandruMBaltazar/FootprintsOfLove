import React from "react";
import logo from "../assets/footprints-of-love-logo.png";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import * as authActions from "../actions/auth/authActions";
import { useHistory } from "react-router-dom";
import ProfileImageWithDefault from "./ProfileImageWithDefault";

const TopBar = (props) => {
  let history = useHistory();

  const onClickLogout = () => {
    props.actions.logout().then((response) => {
      history.push("/login");
    });
  };

  let links = (
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
  );

  if (props.user.isLoggedIn) {
    links = (
      <ul className="nav navbar-nav ms-auto">
        <li className="nav-item">
          <div>
            <Link
              to="/profile"
              className="text-decoration-none text-white bg-dark"
            >
              <ProfileImageWithDefault
                className="rounded-circle m-auto"
                width="32"
                height="32"
                image={props.user.image}
              />
              {props.user.first_name}
            </Link>
          </div>
        </li>
      </ul>
    );
  }

  return (
    <div className="bg-dark shadow-sm mb-2">
      <div className="container">
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

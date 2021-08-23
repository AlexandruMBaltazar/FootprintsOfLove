import React from "react";
import { Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

const SecuredRoute = ({ component: Component, user, ...otherProps }) => {
  return (
    <Route
      {...otherProps}
      render={(props) =>
        user.isLoggedIn === true ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      }
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(SecuredRoute);

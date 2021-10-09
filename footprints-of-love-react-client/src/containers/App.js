import { useState, useEffect } from "react";
import TopBar from "../components/TopBar";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserSignupPage from "../pages/UserSignupPage";
import { connect } from "react-redux";
import * as authActions from "../actions/auth/authActions";
import { useHistory } from "react-router-dom";
import SecuredRoute from "../securityUtils/SecuredRoute";
import ForgotPasswordPage from "../pages/ForgotPasswordPage";
import PasswordResetPage from "../pages/PasswordResetPage";
import ProfilePage from "../pages/ProfilePage";
import OnboardingPage from "../pages/OnboardingPage";
import ProfilePhotosPage from "../pages/ProfilePhotosPage";

function App(props) {
  const [pendingApiCalls, setPendingApiCalls] = useState(true);
  let history = useHistory();

  useEffect(() => {
    props.actions
      .getAuthUser()
      .then((response) => {
        setPendingApiCalls(false);
      })
      .catch((errors) => {
        setPendingApiCalls(false);
      });
  }, [props.actions, history]);

  if (pendingApiCalls) {
    return (
      <div className="d-flex flex-column min-vh-100 justify-content-center align-items-center">
        <div className="d-flex align-items-center">
          <div className="spinner-grow text-primary">
            <span className="visually-hidden">Loading...</span>
          </div>
          <span className="ps-2">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div>
      <TopBar />
      <div className="container">
        <Switch>
          <SecuredRoute exact path="/" component={HomePage} />
          <SecuredRoute path="/discover" component={HomePage} />
          <Route path="/forgot" component={ForgotPasswordPage} />
          <Route path="/login" component={LoginPage} />
          <SecuredRoute exact path="/profile" component={ProfilePage} />
          <SecuredRoute
            exact
            path="/profile/photos"
            component={ProfilePhotosPage}
          />
          <SecuredRoute exact path="/profile/:userId" component={ProfilePage} />
          <SecuredRoute
            exact
            path="/profile/photos"
            component={ProfilePhotosPage}
          />
          <Route path="/reset/:token" component={PasswordResetPage} />
          <Route path="/signup" component={UserSignupPage} />
          <SecuredRoute path="/onboarding" component={OnboardingPage} />
        </Switch>
      </div>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getAuthUser: () => dispatch(authActions.loginSuccess()),
    },
  };
};

export default connect(null, mapDispatchToProps)(App);

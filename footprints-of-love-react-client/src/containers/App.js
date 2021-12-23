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
import Echo from "laravel-echo";
import Messages from "../pages/Messages";
import MessageBox from "../components/Messages/MessageBox";

function App(props) {
  const [pendingApiCalls, setPendingApiCalls] = useState(true);
  let history = useHistory();

  // useEffect(() => {
  //   const listen = () => {
  //     window.Pusher = require("pusher-js");

  //     window.Echo = new Echo({
  //       broadcaster: "pusher",
  //       key: "08a3962f0d9474d77255",
  //       cluster: "eu",
  //       forceTLS: true,
  //     });

  //     window.Echo.private(`messages.${props.user.id}`).listen(
  //       ".message.created",
  //       (e) => {
  //         console.log(e.message);
  //       }
  //     );
  //   };

  //   if (props.user.isLoggedIn) {
  //     console.log("is logged in");
  //     listen();
  //   }
  // }, [props.user.id, props.user.isLoggedIn]);

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
    <div className="position-relative">
      <TopBar />
      <div className="container">
        <Switch>
          <SecuredRoute exact path="/" component={HomePage} />
          <SecuredRoute path="/discover" component={HomePage} />
          <Route path="/forgot" component={ForgotPasswordPage} />
          <Route path="/login" component={LoginPage} />
          <SecuredRoute path="/messages" component={Messages} />
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
      {props.isSessionOpen && (
        <div className="position-fixed bottom-0 end-0">
          <MessageBox />
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    isSessionOpen: state.message.isSessionOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getAuthUser: () => dispatch(authActions.loginSuccess()),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

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

function App(props) {
  const [pendingApiCalls, setPendingApiCalls] = useState(true);
  let history = useHistory();

  useEffect(() => {
    setPendingApiCalls(true);
    props.actions
      .getAuthUser()
      .then((response) => {
        setPendingApiCalls(false);
      })
      .catch((errors) => {
        setPendingApiCalls(false);
        history.push("/login");
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
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={UserSignupPage} />
          <Route exact path="/forgot" component={ForgotPasswordPage} />
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

import { useEffect } from "react";
import TopBar from "../components/TopBar";
import { Route, Switch } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/HomePage";
import UserSignupPage from "../pages/UserSignupPage";
import { connect } from "react-redux";
import * as authActions from "../actions/auth/authActions";

function App(props) {
  useEffect(() => {
    props.actions.getAuthUser();
  }, [props.actions]);

  return (
    <div>
      <TopBar />
      <div className="container">
        <Switch>
          <Route exact path="/" component={HomePage} />
          <Route exact path="/login" component={LoginPage} />
          <Route exact path="/signup" component={UserSignupPage} />
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

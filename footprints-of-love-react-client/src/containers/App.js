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
import Messages from "../pages/Messages";
import MessageBox from "../components/Messages/MessageBox";
import Echo from "laravel-echo";
import axios from "axios";
import * as notificationActions from "../actions/notifications/notificationActions";
import Notifications from "../components/Notifications/Notifications";
import LikesPage from "../pages/LikesPage";
import SettingsPage from "../pages/SettingsPage";
import VideoCallModal from "../components/VideoCall/VideoCallModal";
import * as videoCallActions from "../actions/videoCall/videoCallActions";
import IncomingCall from "../components/VideoCall/IncomingCall";

function App(props) {
  const [pendingApiCalls, setPendingApiCalls] = useState(true);
  let history = useHistory();

  const { isSessionOpen, sessionDetails } = props.session;
  const { session_id } = sessionDetails;

  useEffect(() => {
    if (props.user.id !== 0) {
      props.actions.fetchNotifications(props.user.id);
    }
  }, [props.actions, props.user.id]);

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

  useEffect(() => {
    const websocketListen = () => {
      window.Pusher = require("pusher-js");

      window.Echo = new Echo({
        broadcaster: "pusher",
        key: "08a3962f0d9474d77255",
        cluster: "eu",
        forceTLS: true,
        authorizer: (channel, options) => {
          return {
            authorize: (socketId, callback) => {
              axios
                .post("/api/broadcasting/auth", {
                  socket_id: socketId,
                  channel_name: channel.name,
                })
                .then((response) => {
                  callback(false, response.data);
                })
                .catch((error) => {
                  callback(true, error);
                });
            },
          };
        },
      });

      axios.interceptors.request.use((config) => {
        config.headers["X-Socket-ID"] = window.Echo.socketId();
        return config;
      });

      window.Echo.private("App.Models.User." + props.user.id).notification(
        (notification) => {
          props.actions.notificationHandler(notification);
        }
      );
    };

    if (props.user.id !== 0) {
      websocketListen();
    }

    return () => {
      if (props.user.id !== 0) {
        window.Echo.leave("App.Models.User." + props.user.id);
      }
    };
  }, [isSessionOpen, props.actions, props.user.id, session_id]);

  useEffect(() => {
    const listenForVideoCall = () => {
      window.Echo.private("Video.Channel." + props.user.id)
        .listen(`.client.signal.${props.user.id}`, (signal) => {
          signal.data.data.sdp = signal.data.data.sdp + "\r\n";
          //Incoming call
          if (signal.data.data.type === "offer") {
            console.log("Incoming call");
            props.actions.setSignal(signal.data, true);
          } else {
            console.log("Not incoming call");
            props.actions.setSignal(signal.data, false);
          }
        })
        .listen(`.client.signal.close.${props.user.id}`, (signal) => {
          props.actions.closeCall();
        });
    };

    if (props.user.id !== 0) {
      listenForVideoCall();
    }

    return () => {
      if (props.user.id !== 0) {
        window.Echo.leave("Video.Channel." + props.user.id);
      }
    };
  }, [props.actions, props.user.id]);

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
      <div className="position-relative">
        <Switch>
          <SecuredRoute exact path="/" component={HomePage} />
          <SecuredRoute path="/discover" component={HomePage} />
          <Route path="/forgot" component={ForgotPasswordPage} />
          <Route path="/login" component={LoginPage} />
          <SecuredRoute path="/likes" component={LikesPage} />
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
          <SecuredRoute path="/settings" component={SettingsPage} />
          <SecuredRoute path="/onboarding" component={OnboardingPage} />
        </Switch>
        {props.videoCall.incomingCall && <IncomingCall />}
        <Notifications />
      </div>
      {isSessionOpen && (
        <div className="position-fixed bottom-0 end-0">
          <MessageBox />
        </div>
      )}
      {props.videoCall.callPlaced && <VideoCallModal />}
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    session: state.message,
    notification: state.notification,
    videoCall: state.videoCall,
    peer: state.videoCall.peer,
    stream: state.videoCall.stream,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getAuthUser: () => dispatch(authActions.loginSuccess()),
      notificationHandler: (notification) =>
        dispatch(notificationActions.notificationHandler(notification)),
      fetchNotifications: (userId) =>
        dispatch(notificationActions.fetchNotifications(userId)),
      setSignal: (signal, isIncomingSignal) =>
        dispatch(videoCallActions.setSignal(signal, isIncomingSignal)),
      closeCall: () => dispatch(videoCallActions.closeCall()),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

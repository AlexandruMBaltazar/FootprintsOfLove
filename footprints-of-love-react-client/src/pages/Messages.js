import React from "react";
import UserSessions from "../components/Messages/Sessions/UserSessions";
import { connect } from "react-redux";

const Messages = (props) => {
  const displaySessions = () => {
    if (props.sessions.length <= 0) {
      return (
        <div class="alert alert-info" role="alert">
          You don't have any matches or messages
        </div>
      );
    }

    return <UserSessions />;
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6 mt-5">{displaySessions()}</div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sessions: state.session.sessions,
  };
};

export default connect(mapStateToProps)(Messages);

import React from "react";
import UserSessions from "../components/Messages/Sessions/UserSessions";
import { connect } from "react-redux";

const Messages = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6 mt-5">
            <UserSessions />
          </div>
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

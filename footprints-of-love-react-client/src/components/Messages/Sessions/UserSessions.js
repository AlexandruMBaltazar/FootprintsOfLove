import React from "react";
import { connect } from "react-redux";
import UserSession from "./UserSession";

const UserSessions = (props) => {
  return (
    <div>
      <div class="list-group">
        {props.sessions &&
          props.sessions.map((session) => {
            return <UserSession key={session.id} session={session} />;
          })}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sessions: state.session.sessions,
  };
};

export default connect(mapStateToProps)(UserSessions);

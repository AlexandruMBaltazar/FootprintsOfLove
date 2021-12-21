import React, { useEffect } from "react";
import { connect } from "react-redux";
import UserSessions from "../components/Messages/Sessions/UserSessions";
import * as sessionActions from "../actions/sessions/sessionActions";

const Messages = (props) => {
  useEffect(() => {
    const loadSessions = () => {
      props.actions.fetchSessions();
    };

    loadSessions();
  }, [props.actions]);

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

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchSessions: () => dispatch(sessionActions.fetchSessions()),
    },
  };
};

export default connect(null, mapDispatchToProps)(Messages);

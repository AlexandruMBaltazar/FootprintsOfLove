import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import UserSession from "./UserSession";
import * as sessionActions from "../../../actions/sessions/sessionActions";

const UserSessions = (props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const loadSessions = () => {
      props.actions.fetchSessions(page);
    };

    loadSessions();
  }, [page, props.actions]);

  useEffect(() => {
    return () => {
      props.actions.clearSessions();
    };
  }, [props.actions]);

  return (
    <div>
      <div className="list-group">
        {props.sessions &&
          props.sessions.map((session) => {
            return <UserSession key={session.id} session={session} />;
          })}
      </div>
      {props.next && (
        <div className="d-flex justify-content-center text-center mt-2">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setPage(page + 1)}
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    sessions: state.session.sessions,
    next: state.session.next,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchSessions: (page) => dispatch(sessionActions.fetchSessions(page)),
      clearSessions: () => dispatch(sessionActions.clearSessions()),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSessions);

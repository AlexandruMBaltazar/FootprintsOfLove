import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import UserSession from "./UserSession";
import * as sessionActions from "../../../actions/sessions/sessionActions";

const UserSessions = (props) => {
  const [page, setPage] = useState(1);
  const [filterBy, setFilterBy] = useState("all");

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

  const getFilteredSessions = () => {
    switch (filterBy) {
      case "all":
        return props.sessions;

      case "newMatch":
        return props.sessions.filter(
          (session) => session.latest_message === null
        );

      case "yourTurn":
        return props.sessions.filter(
          (session) =>
            session.latest_message &&
            session.latest_message.user_id !== props.auth.id
        );

      default:
        return props.sessions;
    }
  };

  return (
    <div>
      <div
        className="btn-group mb-4 col-12"
        role="group"
        aria-label="Basic radio toggle button group"
      >
        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio1"
          autocomplete="off"
          onClick={() => setFilterBy("all")}
          defaultChecked
        />
        <label className="btn btn-outline-primary" for="btnradio1">
          All
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio2"
          autocomplete="off"
          onClick={() => setFilterBy("yourTurn")}
        />
        <label className="btn btn-outline-primary" for="btnradio2">
          Your turn
        </label>

        <input
          type="radio"
          className="btn-check"
          name="btnradio"
          id="btnradio3"
          autocomplete="off"
          onClick={() => setFilterBy("newMatch")}
        />
        <label className="btn btn-outline-primary" for="btnradio3">
          New matches
        </label>
      </div>
      <div className="list-group">
        {props.sessions &&
          getFilteredSessions().map((session) => {
            return (
              <UserSession
                key={session.id}
                session={session}
                hasNotification={
                  [
                    ...props.notification.messageNotifications,
                    ...props.notification.matchNotifications,
                  ].filter(
                    (notification) =>
                      notification.session_id === session.id ||
                      notification.user_id === session.user_id
                  ).length > 0
                }
              />
            );
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
    auth: state.auth,
    sessions: state.session.sessions,
    next: state.session.next,
    notification: state.notification,
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

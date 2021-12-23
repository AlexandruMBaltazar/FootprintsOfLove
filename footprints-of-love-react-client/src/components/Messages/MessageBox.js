import React, { useEffect } from "react";
import { connect } from "react-redux";
import ProfileImageWithDefault from "../ProfileImageWithDefault";
import Message from "./Message";
import * as messageActions from "../../actions/messages/messageActions";
import Spinner from "../Spinner";
import { Link } from "react-router-dom";

const MessageBox = (props) => {
  const { first_name, profile_photo, session_id, user_id } =
    props.sessionDetails;

  useEffect(() => {
    const fetchMessages = () => {
      props.actions.fetchMessages(session_id);
    };

    fetchMessages();
  }, [props.actions, session_id]);

  const displayMessages = () => {
    if (props.isFetchingMessages) {
      return (
        <div className="my-auto">
          <Spinner />
        </div>
      );
    }

    return (
      <div>
        {props.messages.map((message, index, array) => {
          return (
            <div
              className={`d-flex align-items-baseline ${
                message.user_id === props.auth.id
                  ? "text-end justify-content-end"
                  : ""
              }`}
            >
              <Message
                key={message.id}
                message={message}
                groupStart={
                  index === 0 || array[index - 1].user_id !== message.user_id
                }
                groupEnd={
                  index === array.length - 1 ||
                  array[index + 1].user_id !== message.user_id
                }
                isAuth={message.user_id === props.auth.id}
                profilePhoto={profile_photo}
              />
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="container mt-4 me-5" style={{ zIndex: "1030" }}>
      <div
        className="card mx-auto"
        style={{ maxWidth: "600px", width: "25rem" }}
      >
        <div className="card-header bg-dark">
          <div className="navbar navbar-expand p-0">
            <ul className="navbar-nav me-auto align-items-center">
              <li className="nav-item">
                <Link
                  to={`/profile/${user_id}`}
                  className="nav-link d-flex align-items-center"
                >
                  <div
                    className="position-relative"
                    style={{
                      width: "50px",
                      height: "50px",
                      borderRadius: "50%",
                      border: "2px",
                      solid: "#e84118",
                      padding: "2px",
                    }}
                  >
                    <ProfileImageWithDefault
                      alt="profile"
                      width="50"
                      height="50"
                      src={profile_photo ? `/${profile_photo.location}` : null}
                      className={`rounded-circle`}
                    />
                    <span className="position-absolute bottom-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
                      <span className="visually-hidden">New alerts</span>
                    </span>
                  </div>
                  <span className="nav-link text-white fs-5 ps-3">
                    {first_name}
                  </span>
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <button
                  type="button"
                  className="btn-close"
                  style={{ backgroundColor: "white" }}
                  onClick={() => props.actions.changeSessionStatus()}
                ></button>
              </li>
            </ul>
          </div>
        </div>
        <div
          className="card-body overflow-auto p-4"
          style={{
            height: "500px",
            display: "flex",
            flexDirection: "column-reverse",
          }}
        >
          {displayMessages()}
        </div>
        <div className="mt-5">
          <div className="card-footer bg-white position-absolute w-100 bottom-0 m-0 p-2">
            <div className="input-group mt">
              <div className="input-group-text bg-transparent border-0">
                <button className="btn btn-light text-secondary">
                  <i className="fas fa-paperclip"></i>
                </button>
              </div>
              <input
                type="text"
                className="form-control border-0"
                placeholder="Write a message..."
              />
              <div className="input-group-text bg-transparent border-0">
                <button className="btn btn-light text-secondary">
                  <i className="fas fa-smile"></i>
                </button>
              </div>
              <div className="input-group-text bg-transparent border-0">
                <button className="btn btn-light text-secondary">
                  <i className="fas fa-microphone"></i>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    sessionDetails: state.message.sessionDetails,
    messages: state.message.messages,
    isFetchingMessages: state.message.isFetchingMessages,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchMessages: (session_id) =>
        dispatch(messageActions.fetchMessages(session_id)),
      changeSessionStatus: () => dispatch(messageActions.changeSessionStatus()),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MessageBox);

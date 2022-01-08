import React from "react";
import ProfileImageWithDefault from "../../ProfileImageWithDefault";
import { connect } from "react-redux";
import * as messageActions from "../../../actions/messages/messageActions";

const UserSession = (props) => {
  const { session } = props;
  const { id, first_name, latest_message, profile_photo, user_id } = session;

  const displayMessageStatus = () => {
    if (latest_message && latest_message.user_id === props.auth.id) {
      return "";
    }

    return (
      <div className="badge bg-primary rounded-pill d-inline float-end">
        {latest_message && latest_message.user_id !== props.auth.id
          ? "Your turn"
          : "New match"}
      </div>
    );
  };

  return (
    <div>
      <button
        className="list-group-item list-group-item-action"
        aria-current="true"
        onClick={() =>
          props.actions.changeSessionStatus({
            session_id: id,
            user_id,
            profile_photo,
            first_name,
          })
        }
      >
        <div className="row">
          <div className="col-12 col-md-2">
            <ProfileImageWithDefault
              alt="profile"
              width="70"
              height="70"
              src={profile_photo ? `/${profile_photo.location}` : null}
              className={`rounded-circle shadow`}
            />
          </div>
          <div className="col-12 col-md-10">
            <div className="w-100 align-baseline pe-1">
              <h5 className="mb-1 d-inline">{first_name}</h5>
              {displayMessageStatus()}
            </div>
            <div className="align-baseline">
              <p className="text-truncate d-inline">
                {latest_message ? latest_message.message : "It's a match!"}
              </p>
              {props.hasNotification && (
                <span
                  className="float-end me-4 mt-2 d-block p-2 border border-light rounded-circle"
                  style={{ backgroundColor: "rgb(224, 0, 149)" }}
                >
                  <span className="visually-hidden">New alerts</span>
                </span>
              )}
            </div>
          </div>
        </div>
      </button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      changeSessionStatus: (sessionId) =>
        dispatch(messageActions.changeSessionStatus(sessionId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserSession);

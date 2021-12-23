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
      <div class="badge bg-primary rounded-pill d-inline float-end">
        {latest_message && latest_message.user_id !== props.auth.id
          ? "Your turn"
          : "New match"}
      </div>
    );
  };

  return (
    <div>
      <button
        class="list-group-item list-group-item-action"
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
            <div class="w-100 align-baseline">
              <h5 class="mb-1 d-inline">{first_name}</h5>
              {displayMessageStatus()}
            </div>
            <p class="mb-1 text-truncate">
              {latest_message ? latest_message.message : "It's a match!"}
            </p>
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

import React from "react";
import ProfileImageWithDefault from "../../ProfileImageWithDefault";
import { connect } from "react-redux";

const UserSession = (props) => {
  const { session } = props;
  const { first_name, latest_message, profile_photo } = session;

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
            <p class="mb-1">
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

export default connect(mapStateToProps)(UserSession);

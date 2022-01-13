import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ProfileImageWithDefault from "../ProfileImageWithDefault";
import { connect } from "react-redux";
import * as notificationActions from "../../actions/notifications/notificationActions";

const User = (props) => {
  const { profile_photo, first_name, age, id } = props.user;

  const hasLikeNotification = useRef(props.likeNotification);

  useEffect(() => {
    if (props.likeNotification) {
      props.actions.deleteNotification(props.likeNotification.id);
    }
  }, [props.actions, props.likeNotification]);

  return (
    <div className="col-12 col-lg-3 mb-5">
      <div className="card" style={{ width: "18rem" }}>
        <ProfileImageWithDefault
          width="286"
          height="286"
          src={profile_photo ? `/${profile_photo.location}` : null}
          className={`card-img-top`}
        />
        <div className="card-body text-center">
          {hasLikeNotification.current && (
            <span
              class="badge rounded-pill mt-0 mb-2"
              style={{ backgroundColor: "rgb(224, 0, 149)" }}
            >
              New Like
            </span>
          )}
          <h5 className="card-title text-center">{`${first_name}, ${age}`}</h5>
          <Link
            to={`/profile/${props.user.id}`}
            className="btn btn-primary text-center"
          >
            Discover more
          </Link>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      deleteNotification: (notificationId) =>
        dispatch(notificationActions.deleteNotification(notificationId)),
    },
  };
};

export default connect(null, mapDispatchToProps)(User);

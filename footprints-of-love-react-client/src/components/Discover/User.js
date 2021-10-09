import React from "react";
import { Link } from "react-router-dom";
import ProfileImageWithDefault from "../ProfileImageWithDefault";

const User = (props) => {
  return (
    <div>
      <div className="card" style={{ width: "18rem" }}>
        <ProfileImageWithDefault
          width="286"
          height="286"
          src={
            props.user.profile_photo
              ? `/${props.user.profile_photo.location}`
              : null
          }
          className={`card-img-top`}
        />
        <div className="card-body">
          <h5 className="card-title">
            {props.user.first_name + " - " + props.user.detail.age}
          </h5>
          <p className="card-text">
            Some quick example text to build on the card title and make up the
            bulk of the card's content.
          </p>
          <Link to={`/profile/${props.user.id}`} className="btn btn-primary">
            Discover more
          </Link>
        </div>
      </div>
    </div>
  );
};

export default User;

import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import ProfileImageWithDefault from "../ProfileImageWithDefault";

const User = (props) => {
  const { profile_photo, first_name, age } = props.user;

  return (
    <div className="col-12 col-lg-3 mb-5">
      <div className="card" style={{ width: "18rem" }}>
        <ProfileImageWithDefault
          src={profile_photo ? `/${profile_photo.location}` : null}
          className={`card-img-top`}
        />
        <div className="card-body text-center">
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

export default User;

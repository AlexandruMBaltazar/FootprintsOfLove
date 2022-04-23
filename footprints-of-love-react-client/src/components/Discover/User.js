import React from "react";
import { Link } from "react-router-dom";
import ProfileImageWithDefault from "../ProfileImageWithDefault";

const User = (props) => {
  let headerInfo = "";
  let aboutUserInfo =
    "This user doesn't have any description about themselves yet";

  if (props.user.detail.age) {
    headerInfo += `${props.user.detail.age}`;
  }

  if (props.user.location) {
    headerInfo += ` • ${props.user.location.city}, ${props.user.location.country}`;
  }

  if (props.user.answers.length > 0) {
    aboutUserInfo = props.user.answers.find(
      (answer) => answer.topic_id === 1
    ).value;
  }

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
            <div className="text-center">{props.user.first_name}</div>
            <div className="text-center">{headerInfo}</div>
          </h5>
          <p className="card-text">
            <div>
              {aboutUserInfo.substring(0, 300)}
              {aboutUserInfo.length >= 300 && "..."}
            </div>
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

import React from "react";
import { connect } from "react-redux";

const ProfileImageWithDefault = (props) => {
  let imageSource = "/storage/profile.png";

  if (props.user.profile_photo) {
    imageSource = `/${props.user.profile_photo.location}`;
  }

  return (
    <img
      width={props.width}
      height={props.height}
      className={props.className}
      alt="profile"
      src={props.src || imageSource}
      onError={(e) => {
        e.target.src = "/storage/profile.png";
      }}
    />
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(ProfileImageWithDefault);

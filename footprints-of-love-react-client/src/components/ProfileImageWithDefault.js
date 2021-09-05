import React from "react";
import { connect } from "react-redux";

const ProfileImageWithDefault = (props) => {
  let imageSource = "/storage/profile.png";

  let profilePhoto =
    props.photo &&
    props.photo.photos.filter((photo) => {
      return photo.is_profile_photo === true;
    });

  if (profilePhoto.length !== 0) {
    imageSource = `/${profilePhoto[0].location}`;
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
    photo: state.photo,
  };
};

export default connect(mapStateToProps)(ProfileImageWithDefault);

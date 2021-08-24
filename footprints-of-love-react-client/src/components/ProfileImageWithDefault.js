import React from "react";

const ProfileImageWithDefault = (props) => {
  let imageSource = "/storage/profile.png";

  if (props.image) {
    imageSource = `/images/profile/${props.image}`;
  }

  return (
    <img
      {...props}
      src={props.src || imageSource}
      onError={(e) => {
        e.target.src = "/storage/profile.png";
      }}
    />
  );
};

export default ProfileImageWithDefault;

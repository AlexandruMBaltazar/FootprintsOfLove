import React from "react";
import ProfileImageWithDefault from "../ProfileImageWithDefault";

const Photo = (props) => {
  let imageSource = "/storage/profile.png";

  if (props.image) {
    imageSource = `/${props.image}`;
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

export default Photo;

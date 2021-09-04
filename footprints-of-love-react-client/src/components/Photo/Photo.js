import React from "react";
import ProfileImageWithDefault from "../ProfileImageWithDefault";

const Photo = (props) => {
  return (
    <div>
      <ProfileImageWithDefault
        className="img-fluid"
        image={props.location}
        width="558"
        height="993"
      />
    </div>
  );
};

export default Photo;

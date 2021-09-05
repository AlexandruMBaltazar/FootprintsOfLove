import React from "react";
import ProfileImageWithDefault from "../ProfileImageWithDefault";
import styles from "./css/photolist.module.css";
import { connect } from "react-redux";
import * as photoActions from "../../actions/photo/photoActions";

const PhotoListItem = (props) => {
  const deletePhoto = () => {
    props.actions.deletePhoto(props.photo.id);
  };

  return (
    <li
      className="list-group-item"
      style={{
        backgroundColor: "#f3f5f9",
        borderLeft: "none",
        borderRight: "none",
      }}
    >
      <div className="d-flex justify-content-between align-items-center py-2">
        <div>
          <ProfileImageWithDefault
            alt="profile"
            width="90"
            height="90"
            key={props.photo.id}
            image={props.photo.location}
            className="rounded-circle shadow py"
          />
          <span
            className={`remove ms-3 ${styles.remove}`}
            onClick={deletePhoto}
          >
            Remove
          </span>
        </div>
        <span className="badge bg-primary rounded-pill">14</span>
      </div>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      deletePhoto: (photoId) => dispatch(photoActions.deletePhoto(photoId)),
    },
  };
};

export default connect(null, mapDispatchToProps)(PhotoListItem);

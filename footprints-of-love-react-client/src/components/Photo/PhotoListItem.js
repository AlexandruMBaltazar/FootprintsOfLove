import React from "react";
import styles from "./css/photolist.module.css";
import { connect } from "react-redux";
import * as photoActions from "../../actions/photo/photoActions";
import Photo from "./Photo";

const PhotoListItem = (props) => {
  const setProfilePhoto = () => {
    props.actions.setProfilePhoto(props.photo.id, { is_profile_photo: true });
  };

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
          <Photo
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
        <button
          className="btn btn-primary ms-2"
          onClick={setProfilePhoto}
          disabled={props.photo.is_profile_photo}
        >
          Set Profile Photo
        </button>
      </div>
    </li>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      deletePhoto: (photoId) => dispatch(photoActions.deletePhoto(photoId)),
      setProfilePhoto: (photoId, photo) =>
        dispatch(photoActions.setProfilePhoto(photoId, photo)),
    },
  };
};

export default connect(null, mapDispatchToProps)(PhotoListItem);

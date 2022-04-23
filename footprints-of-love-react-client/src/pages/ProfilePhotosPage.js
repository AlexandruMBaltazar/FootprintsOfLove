import React, { useState, useEffect } from "react";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";
import { connect } from "react-redux";
import * as photoActions from "../actions/photo/photoActions";
import UploadInput from "../components/UploadInput";
import PhotoAlbum from "../components/Photo/PhotoAlbum";
import PhotoList from "../components/Photo/PhotoList";

const ProfilePhotosPage = (props) => {
  const [photo, setPhoto] = useState();
  const MAX_PHOTOS = 5;

  useEffect(() => {
    return () => {
      props.actions.clearUploadPhotoErrors();
    };
  }, [props.actions, props.user.id]);

  const onFileSelect = (event) => {
    if (event.target.files.length === 0) {
      return;
    }

    const photo = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(photo);
      props.actions.clearUploadPhotoErrors();
    };

    reader.readAsDataURL(photo);
  };

  const uploadPhoto = () => {
    const body = new FormData();
    body.append("photo", photo);
    props.actions.uploadPhoto(props.user.id, body).then((response) => {
      setPhoto();
    });
  };

  const displayUploadInput = () => {
    if (props.photo.photos.length >= MAX_PHOTOS) {
      return (
        <div class="alert alert-info" role="alert">
          Max photo limit reached
        </div>
      );
    }

    return (
      <UploadInput
        onClick={uploadPhoto}
        onChange={onFileSelect}
        disabled={props.photo.pendingApiCall || !photo}
        pendingApiCall={props.photo.pendingApiCall}
        hasError={
          props.uploadPhotoErrors && props.uploadPhotoErrors.length !== 0
            ? true
            : undefined
        }
        error={props.uploadPhotoErrors}
      />
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="pt-2">
          <div className="d-flex">
            <div>
              <ProfileImageWithDefault
                alt="profile"
                width="75"
                height="75"
                src={
                  props.user.profile_photo
                    ? `/${props.user.profile_photo.location}`
                    : null
                }
                className="rounded-circle shadow"
              />
            </div>
            <div className="ms-2 flex-fill align-self-center">
              <span className="fs-4 fw-bolder">{props.user.first_name}</span>
            </div>
            <div className="align-self-center">{displayUploadInput()}</div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <span className="fs-5 fw-bolder">Your Photos</span>

        <div className="col-8">
          <PhotoAlbum />
        </div>
        <div className="col-4">
          <PhotoList />
          {MAX_PHOTOS - props.photo.photos.length !== 0 && (
            <div className="alert alert-info mt-2" role="alert">
              {`You can upload ${
                MAX_PHOTOS - props.photo.photos.length
              } more photos`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    photo: state.photo,
    uploadPhotoErrors: state.photo.uploadPhotoErrors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      uploadPhoto: (userId, photo) =>
        dispatch(photoActions.uploadPhoto(userId, photo)),

      clearUploadPhotoErrors: () =>
        dispatch(photoActions.clearUploadPhotoErrors()),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhotosPage);

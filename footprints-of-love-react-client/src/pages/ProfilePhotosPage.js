import React, { useState } from "react";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";
import { connect } from "react-redux";
import * as photoActions from "../actions/photo/photoActions";

const ProfilePhotosPage = (props) => {
  const [photo, setPhoto] = useState();

  const onFileSelect = (event) => {
    if (event.target.files.length === 0) {
      return;
    }

    const photo = event.target.files[0];
    let reader = new FileReader();

    reader.onloadend = () => {
      setPhoto(photo);
    };

    reader.readAsDataURL(photo);
  };

  const uploadPhoto = () => {
    const body = new FormData();
    body.append("photo", photo);
    props.actions.uploadPhoto(props.user.id, body);
  };

  return (
    <div>
      <div className="row">
        <div className="pt-2">
          <div className="d-flex">
            <div>
              <ProfileImageWithDefault
                alt="profile"
                width="75"
                height="75"
                src={props.loadedImage}
                className={`rounded-circle shadow`}
              />
            </div>
            <div className="ms-2 flex-fill align-self-center">
              <span className="fs-4 fw-bolder">{props.user.first_name}</span>
            </div>
            <div className="align-self-center">
              <div className="input-group mb-3">
                <button
                  className="btn btn-outline-primary"
                  type="button"
                  onClick={uploadPhoto}
                >
                  Upload Photo
                </button>
                <input
                  type="file"
                  className="form-control"
                  onChange={onFileSelect}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-10">
          <span className="fs-5 fw-bolder">Your Photos</span>
        </div>
        <div className="col-2">Photos List</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      uploadPhoto: (userId, photo) =>
        dispatch(photoActions.uploadPhoto(userId, photo)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePhotosPage);

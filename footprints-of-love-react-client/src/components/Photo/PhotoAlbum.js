import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as photoActions from "../../actions/photo/photoActions";
import Photo from "./Photo";

const PhotoAlbum = (props) => {
  useEffect(() => {
    props.actions.getPhotos(props.user.id);
  }, [props.actions, props.user.id]);

  return (
    <div className="mt-2 mb-2 d-grid gap-4">
      {props.photo.photos &&
        props.photo.photos.map((photo) => {
          return <Photo key={photo.id} location={photo.location} />;
        })}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    photo: state.photo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getPhotos: (userId) => dispatch(photoActions.getPhotos(userId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoAlbum);

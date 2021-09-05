import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as photoActions from "../../actions/photo/photoActions";
import Photo from "./Photo";
import Spinner from "../Spinner";

const PhotoAlbum = (props) => {
  useEffect(() => {
    props.actions.getPhotos(props.user.id);
  }, [props.actions, props.user.id]);

  let content;

  if (props.isFetchingPhotos) {
    content = (
      <div className="col-1 pt-3">
        <Spinner />
      </div>
    );
  } else {
    content =
      props.photo.photos &&
      props.photo.photos.map((photo) => {
        return (
          <Photo
            className="img-fluid"
            key={photo.id}
            image={photo.location}
            width="558"
            height="993"
          />
        );
      });
  }

  return <div className="mt-2 mb-2 d-grid gap-4">{content}</div>;
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    photo: state.photo,
    isFetchingPhotos: state.photo.isFetchingPhotos,
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

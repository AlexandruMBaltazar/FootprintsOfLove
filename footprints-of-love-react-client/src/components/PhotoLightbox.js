import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css"; // This only needs to be imported once in your app
import * as photoActions from "../actions/photo/photoActions";
import styles from "../pages/css/profilepage.module.css";

const PhotoLightbox = (props) => {
  const [photoIndex, setPhotoIndex] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const fetchProfilePhotos = () => {
      if (props.profile.id) {
        props.actions.fetchProfilePhotos(props.profile.id);
      }
    };
    fetchProfilePhotos();
  }, [props.actions, props.profile.id]);

  return (
    <div>
      <button
        type="button"
        className={`btn btn-primary mt-5 position-absolute w-50 top-50 start-50 translate-middle`}
        onClick={() => setIsOpen(true)}
      >
        View
      </button>

      {isOpen && (
        <Lightbox
          mainSrc={"/" + props.photos[photoIndex].location}
          nextSrc={"/" + props.photos[(photoIndex + 1) % props.photos.length]}
          prevSrc={
            props.photos[
              (photoIndex + props.photos.length - 1) % props.photos.length
            ]
          }
          onCloseRequest={() => setIsOpen(false)}
          onMovePrevRequest={() =>
            setPhotoIndex(
              (photoIndex + props.photos.length - 1) % props.photos.length
            )
          }
          onMoveNextRequest={() =>
            setPhotoIndex((photoIndex + 1) % props.photos.length)
          }
        />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    photos: state.profile.photos,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchProfilePhotos: (userId) =>
        dispatch(photoActions.fetchProfilePhotos(userId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoLightbox);

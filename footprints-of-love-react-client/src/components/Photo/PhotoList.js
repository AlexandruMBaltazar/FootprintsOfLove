import React from "react";
import { connect } from "react-redux";
import Spinner from "../Spinner";
import PhotoListItem from "./PhotoListItem";

const PhotoList = (props) => {
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
        return <PhotoListItem key={photo.id} photo={photo} />;
      });
  }

  return (
    <div>
      <ul className="list-group">{content}</ul>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    photo: state.photo,
    isFetchingPhotos: state.photo.isFetchingPhotos,
  };
};

export default connect(mapStateToProps)(PhotoList);

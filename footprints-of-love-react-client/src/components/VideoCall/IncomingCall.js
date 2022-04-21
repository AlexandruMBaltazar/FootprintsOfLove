import React, { useState } from "react";
import { ToastContainer, Toast } from "react-bootstrap";
import { connect } from "react-redux";
import ProfileImageWithDefault from "../ProfileImageWithDefault";
import * as videoCallActions from "../../actions/videoCall/videoCallActions";

const IncomingCall = (props) => {
  const [show, setShow] = useState(true);

  const { id, first_name, profile_photo } = props.caller;
  const { location } = profile_photo;

  return (
    <div>
      <ToastContainer className="me-5" position="top-end">
        <Toast>
          <Toast.Header>
            <ProfileImageWithDefault
              alt="profile"
              width="35"
              height="35"
              src={location ? `/${location}` : null}
              className={`rounded-circle`}
            />
            <strong className="me-auto ms-2">
              {first_name + " is video calling you"}
            </strong>
          </Toast.Header>
          <Toast.Body>
            <div className="d-flex justify-content-between">
              <button
                type="button"
                className="btn btn-success"
                onClick={() => props.actions.placeCall(id)}
              >
                <i className="fas fa-phone-alt pe-1"></i> Accept
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => console.log("deny call")}
              >
                <i className="fas fa-phone-slash pe-1"></i> Decline
              </button>
            </div>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    caller: state.videoCall.signal.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      placeCall: (userId) => dispatch(videoCallActions.placeCall(userId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(IncomingCall);

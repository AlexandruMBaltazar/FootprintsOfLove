import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import * as mediaHandler from "../../securityUtils/mediaHandler";
import styles from "./css/VideoCallModal.module.css";
import Peer from "simple-peer";
import axios from "axios";
import * as videoCallActions from "../../actions/videoCall/videoCallActions";

const VideoCallModal = (props) => {
  const [peer, setPeer] = useState(undefined);
  const [userStream, setUserStream] = useState(null);

  const myVideo = useRef(null);
  const userVideo = useRef(null);

  const { user } = props;

  const startPeer = useCallback(
    (userId, stream, initiator = true) => {
      const peer = new Peer({
        initiator,
        stream: stream,
        trickle: false,
      });

      props.actions.setPeer({ peer, stream });

      peer.on("signal", (data) => {
        axios.post("/api/call/placeCall", {
          type: "signal",
          userId: user.id,
          otherUserId: userId,
          data: data,
        });
      });

      peer.on("stream", (stream) => {
        try {
          userVideo.current.srcObject = stream;
        } catch (e) {
          userVideo.current.src = URL.createObjectURL(stream);
        }

        userVideo.current.play();
      });

      peer.on("close", () => {
        if (peer !== undefined) {
          peer.destroy();
        }
        setPeer(undefined);
      });

      return peer;
    },
    [props.actions, user.id]
  );

  useEffect(() => {
    mediaHandler.getPermissions().then((stream) => {
      setUserStream((prevUserStream) => stream);
      try {
        myVideo.current.srcObject = stream;
      } catch (e) {
        myVideo.current.src = URL.createObjectURL(stream);
      }

      myVideo.current.play();

      if (props.callPlaced) {
        setPeer((prevPeer) => startPeer(props.userId, stream, props.initiator));
      }
    });
  }, [props.callPlaced, props.initiator, props.userId, startPeer]);

  useEffect(() => {
    if (props.signal && peer) {
      peer.signal(props.signal.data);
    }
  }, [peer, props.signal]);

  const closeCall = () => {
    peer.removeStream(userStream);
    userStream.getTracks().forEach((track) => track.stop());
    setUserStream(null);
    myVideo.current = null;
    userVideo.current = null;

    peer.emit("close");
    props.actions.closeCallPlaced({ user_id: props.userId });
  };

  return (
    <div
      className="modal fade d-block show"
      style={{ backgroundColor: "#00000061" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Video Call</h5>
            <button
              type="button"
              className="btn-close"
              onClick={() => closeCall()}
            ></button>
          </div>
          <div className="modal-body">
            <div className={`video-container ${styles.videoContainer}`}>
              <video
                className={`my-video ${styles.myVideo}`}
                ref={myVideo}
              ></video>
              <video
                className={`user-video ${styles.userVideo}`}
                ref={userVideo}
              ></video>
            </div>
          </div>
          <div className="modal-footer d-flex justify-content-center">
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => closeCall()}
            >
              <i className="fas fa-phone-slash pe-1"></i> Close Call
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    userId: state.videoCall.userId,
    callPlaced: state.videoCall.callPlaced,
    signal: state.videoCall.signal,
    initiator: state.videoCall.initiator,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      closeCallPlaced: (userId) =>
        dispatch(videoCallActions.closeCallPlaced(userId)),
      setPeer: (data) => dispatch(videoCallActions.setPeer(data)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoCallModal);

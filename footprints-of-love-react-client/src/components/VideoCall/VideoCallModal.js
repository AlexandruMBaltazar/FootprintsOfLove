import React, { useState, useEffect, useRef, useCallback } from "react";
import { connect } from "react-redux";
import * as mediaHandler from "../../securityUtils/mediaHandler";
import styles from "./css/VideoCallModal.module.css";
import Peer from "simple-peer";
import axios from "axios";
import * as videoCallActions from "../../actions/videoCall/videoCallActions";

const VideoCallModal = (props) => {
  const [peer, setPeer] = useState(undefined);

  const userStream = useRef(null);
  const myVideo = useRef(null);
  const userVideo = useRef(null);

  const { user } = props;

  const startPeer = useCallback(
    (userId, initiator = true) => {
      console.log("Peer Stream: " + userStream.current);
      const peer = new Peer({
        initiator,
        stream: userStream.current,
        trickle: false,
      });

      peer.on("signal", (data) => {
        axios.post("/api/signal", {
          type: "signal",
          userId: user.id,
          otherUserId: userId,
          data: data,
        });
      });

      peer.on("stream", (stream) => {
        console.log("STREAM");
        try {
          userVideo.current.srcObject = stream;
        } catch (e) {
          userVideo.current.src = URL.createObjectURL(stream);
        }

        userVideo.current.play();
      });

      peer.on("close", () => {
        let peerObj = peer;
        if (peerObj !== undefined) {
          peerObj.destroy();
        }

        peerObj = undefined;
      });

      return peer;
    },
    [user.id]
  );

  useEffect(() => {
    mediaHandler.getPermissions().then((stream) => {
      console.log("Stream: " + stream);
      userStream.current = stream;
      console.log("User Stream: " + userStream.current);
      try {
        myVideo.current.srcObject = stream;
      } catch (e) {
        myVideo.current.src = URL.createObjectURL(stream);
      }

      myVideo.current.play();

      if (props.callPlaced) {
        console.log("start peer");
        setPeer(startPeer(props.userId, props.initiator));
      }
    });
  }, [props.callPlaced, props.initiator, props.userId, startPeer]);

  useEffect(() => {
    if (props.signal && peer) {
      console.log("Signal: " + JSON.stringify(props.signal.data));
      console.log("Peer to signal: " + JSON.stringify(peer));
      peer.signal(props.signal.data);
    }
  }, [peer, props.signal]);

  return (
    <div
      className="modal fade d-block show"
      style={{ backgroundColor: "#00000061" }}
    >
      <div className="modal-dialog modal-xl modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Modal title</h5>
            <button type="button" className="btn-close"></button>
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
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary">
              Close
            </button>
            <button type="button" className="btn btn-primary">
              Save changes
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
    peer: state.videoCall.peer,
    initiator: state.videoCall.initiator,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      setPeer: (peer) => dispatch(videoCallActions.setPeer(peer)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoCallModal);

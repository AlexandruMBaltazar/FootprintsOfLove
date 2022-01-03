import React from "react";
import { connect } from "react-redux";
import ProfileImageWithDefault from "../ProfileImageWithDefault";
import styles from "./css/MessageBox.module.css";
import moment from "moment";

const MessageBox = (props) => {
  const { groupStart, groupEnd, isAuth } = props;
  const { message, created_at } = props.message;

  const displayMessage = () => {
    // if (!groupStart) {
    //   return (
    //     <div>
    //       <div
    //         className={`card ${styles.cardText} ${
    //           props.isAuth ? "bg-secondary" : "bg-primary"
    //         } d-inline-block p-2 px-3 m-1 text-white rounded-pill`}
    //       >
    //         <span>{message}</span>
    //       </div>
    // {groupEnd && (
    //   <div>
    //     <div className="small mb-3 ps-2">01:10PM</div>
    //   </div>
    // )}
    //     </div>
    //   );
    // }

    return (
      <div>
        <div>
          <div
            className={`card ${styles.cardText} ${
              props.isAuth ? "bg-secondary" : "bg-primary"
            } d-inline-block p-2 px-3 m-1 text-white rounded-pill`}
          >
            <span>{message}</span>
          </div>
          {groupEnd && (
            <div>
              <div className="small mb-3 ps-2">
                {moment(created_at).fromNow()}
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex">
      {!isAuth && groupStart && (
        <div class={`position-relative ${styles.avatar}`}>
          <ProfileImageWithDefault
            alt="profile"
            width="43"
            height="43"
            src={props.profilePhoto ? `/${props.profilePhoto.location}` : null}
            className={`rounded-circle`}
          />
          <span className="position-absolute bottom-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
            <span className="visually-hidden">New alerts</span>
          </span>
        </div>
      )}
      {displayMessage()}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
    sessionDetails: state.message.sessionDetails,
  };
};

export default connect(mapStateToProps)(MessageBox);

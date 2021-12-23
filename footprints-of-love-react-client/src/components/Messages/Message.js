import React from "react";
import { connect } from "react-redux";
import styles from "./css/MessageBox.module.css";

const MessageBox = (props) => {
  const { groupStart, groupEnd, isAuth } = props;
  const { message } = props.message;

  const displayMessage = () => {
    if (!groupStart) {
      return (
        <div>
          <div
            class={`card ${styles.cardText} ${
              props.isAuth ? "bg-secondary" : "bg-primary"
            } d-inline-block p-2 px-3 m-1 text-white rounded-pill`}
          >
            <span>{message}</span>
          </div>
          {groupEnd && (
            <div>
              <div class="small mb-3 ps-2">01:10PM</div>
            </div>
          )}
        </div>
      );
    }

    return (
      <div class="pe-2">
        <div>
          <div
            class={`card ${styles.cardText} ${
              props.isAuth ? "bg-secondary" : "bg-primary"
            } d-inline-block p-2 px-3 m-1 text-white rounded-pill`}
          >
            <span>{message}</span>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="d-flex">
      {!isAuth && groupStart && (
        <div class={`position-relative ${styles.avatar}`}>
          <img
            src="https://nextbootstrap.netlify.app/assets/images/profiles/1.jpg"
            class="img-fluid rounded-circle"
            alt=""
          />
          <span class="position-absolute bottom-0 start-100 translate-middle p-1 bg-success border border-light rounded-circle">
            <span class="visually-hidden">New alerts</span>
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

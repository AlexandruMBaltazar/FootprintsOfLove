import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { connect } from "react-redux";
import Notification from "./Notification";

const Notifications = (props) => {
  const notifications = [...props.notification.messageNotifications];

  return (
    <div>
      <ToastContainer className="me-5" position="top-end">
        {notifications.length > 0 &&
          notifications.map((notification) => (
            <Notification
              key={`${notification.id}`}
              notification={notification}
            />
          ))}
      </ToastContainer>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

export default connect(mapStateToProps)(Notifications);

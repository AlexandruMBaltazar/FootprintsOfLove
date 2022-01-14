import React from "react";
import { Toast, ToastContainer } from "react-bootstrap";
import { connect } from "react-redux";
import Notification from "./Notification";

const Notifications = (props) => {
  const notifications = [
    ...props.notification.messageNotifications,
    ...props.notification.likeNotifications,
    ...props.notification.matchNotifications,
  ].sort(function (a, b) {
    var keyA = new Date(a.created_at),
      keyB = new Date(b.created_at);
    // Compare the 2 dates
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;
    return 0;
  });

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

import React from "react";

const NotificationPill = (props) => {
  return (
    <span
      className="position-absolute top-0 start-100 translate-middle badge rounded-pill"
      style={{ backgroundColor: "#e00095" }}
    >
      {props.notifications.length + "+"}
      <span className="visually-hidden">unread messages</span>
    </span>
  );
};

export default NotificationPill;

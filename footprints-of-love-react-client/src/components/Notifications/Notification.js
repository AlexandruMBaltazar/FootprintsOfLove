import React, { useEffect, useState } from "react";
import { Toast } from "react-bootstrap";
import ProfileImageWithDefault from "../ProfileImageWithDefault";
import moment from "moment";

const Notification = (props) => {
  const { message, type, created_at, first_name, profile_photo_location } =
    props.notification;

  const [show, setShow] = useState(true);

  const [notificationDetails, setNotificationDetails] = useState({
    header: "",
    body: "",
  });

  useEffect(() => {
    const getNotificationDetails = () => {
      switch (type) {
        case "notification.message":
          setNotificationDetails({
            header: `New message from ${first_name}`,
            body: message,
          });

          break;

        default:
          break;
      }
    };

    getNotificationDetails();
  }, [first_name, message, type]);

  return (
    <Toast onClose={() => setShow(false)} show={show} delay={10000} autohide>
      <Toast.Header>
        <ProfileImageWithDefault
          alt="profile"
          width="35"
          height="35"
          src={profile_photo_location ? `/${profile_photo_location}` : null}
          className={`rounded-circle`}
        />
        <strong className="ps-2">{notificationDetails.header}</strong>
        <small className="ps-2 text-muted">
          {moment(created_at).fromNow()}
        </small>
      </Toast.Header>
      <Toast.Body>{notificationDetails.body}</Toast.Body>
    </Toast>
  );
};

export default Notification;

import React from "react";
import UserSessions from "../components/Messages/Sessions/UserSessions";

const Messages = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6 mt-5">
            <UserSessions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

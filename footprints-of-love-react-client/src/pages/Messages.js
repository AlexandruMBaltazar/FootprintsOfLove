import React from "react";
import UserSessions from "../components/Messages/Sessions/UserSessions";
import FilterSessions from "../components/Messages/Sessions/FilterSessions";

const Messages = (props) => {
  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-6 mt-5">
            <FilterSessions />
            <UserSessions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages;

import React from "react";
import BlockedProfiles from "./Privacy/BlockedProfiles";

const Privacy = (props) => {
  return (
    <div className="d-grid gap-5">
      <div>
        <h3>Privacy</h3>
        <hr></hr>
      </div>

      <div>
        <BlockedProfiles />
      </div>
    </div>
  );
};

export default Privacy;

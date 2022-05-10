import React from "react";
import { connect } from "react-redux";
import GuidesContainer from "./SafetyCenter/GuidesContainer";

const SafetyCenter = (props) => {
  return (
    <div className="d-grid gap-3">
      <div>
        <h3>Safety Center</h3>
        <hr></hr>
      </div>
      <div className="d-flex aligns-items-center justify-content-center">
        <div>
          <span className="fs-3 fw-bold">
            Welcome, {props.user.first_name} 👋
          </span>
          <span className="d-block">
            Checkout our guides for safety advice while you date
          </span>
        </div>
      </div>
      <div className="mt-3">
        <GuidesContainer />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(SafetyCenter);

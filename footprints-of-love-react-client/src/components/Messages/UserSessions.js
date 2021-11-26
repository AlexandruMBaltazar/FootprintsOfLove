import React from "react";
import { connect } from "react-redux";

const UserSessions = () => {
  return <div>User Profile List</div>;
};

const mapStateToProps = (state) => {
  return {
    sessions: state.session,
  };
};

export default connect(mapStateToProps)(UserSessions);

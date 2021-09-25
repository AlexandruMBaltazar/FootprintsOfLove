import React from "react";
import { connect } from "react-redux";
import UsersContainer from "../components/Discover/UsersContainer";

const HomePage = () => {
  return (
    <div className="pt-4">
      <span className="fs-4 fw-bolder">Recommended Just For You</span>
      <UsersContainer />
    </div>
  );
};

export default HomePage;

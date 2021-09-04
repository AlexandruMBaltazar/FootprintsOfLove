import React from "react";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";
import { connect } from "react-redux";
import moment from "moment";
import UserDetails from "../components/User/UserDetails";
import styles from "./css/profilepage.module.css";
import { Link } from "react-router-dom";

const ProfilePage = (props) => {
  const { dob } = props.userDetails.details;

  return (
    <div>
      <div className="row">
        <div className="pt-2">
          <div className="d-flex">
            <div className={`position-relative ${styles.img}`}>
              <ProfileImageWithDefault
                alt="profile"
                width="200"
                height="200"
                src={props.loadedImage}
                className={`rounded-circle shadow`}
              />
              <Link
                to="/profile/photos"
                type="button"
                className={`btn btn-primary mt-5 position-absolute w-50 top-50 start-50 translate-middle ${styles.btn}`}
              >
                Add
              </Link>
            </div>
            <div className="ms-2 flex-fill align-self-center">
              <span className="fs-3 fw-bolder">
                {props.user.first_name} - {moment().diff(dob, "years")}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-8">User description</div>
        <UserDetails />
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    userDetails: state.userDetails,
  };
};

export default connect(mapStateToProps)(ProfilePage);

import React from "react";
import { connect } from "react-redux";
import { Switch } from "react-router-dom";
import { useRouteMatch } from "react-router-dom";
import { Link } from "react-router-dom";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";
import Account from "../components/Settings/Account";
import Privacy from "../components/Settings/Privacy";
import SecuredRoute from "../securityUtils/SecuredRoute";
import styles from "./css/settingspace.module.css";

const SettingsPage = (props) => {
  let { path, url } = useRouteMatch();

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-md-12 col-lg-4 mt-5">
            <div class="card" style={{ width: "20rem" }}>
              <div className="bg-dark p-3">
                <div className="text-center">
                  <ProfileImageWithDefault
                    alt="profile"
                    width="130"
                    height="130"
                    src={
                      props.user.profile_photo
                        ? `/${props.user.profile_photo.location}`
                        : null
                    }
                    className={`rounded-circle shadow`}
                  />
                </div>
              </div>
              <div className="card-body p-0 m-0">
                <div className={`list-group ${styles.side}`}>
                  <Link
                    to={`${url}`}
                    className="side list-group-item list-group-item-action"
                  >
                    <div className="w-100">
                      <h5 className="p-3">My Account</h5>
                    </div>
                  </Link>
                  <Link
                    to={`${url}/privacy`}
                    className="list-group-item list-group-item-action"
                  >
                    <div className="w-100">
                      <h5 className="p-3">Privacy</h5>
                    </div>
                  </Link>
                  <Link className="list-group-item list-group-item-action">
                    <div className="w-100">
                      <h5 className="p-3">Sign Out</h5>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12 col-lg-6 mt-5">
            <Switch>
              <SecuredRoute path={`${path}/privacy`}>
                <Privacy />
              </SecuredRoute>
              <SecuredRoute path={`${path}`}>
                <Account />
              </SecuredRoute>
            </Switch>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
  };
};

export default connect(mapStateToProps)(SettingsPage);

import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router";
import { detailTypes } from "../User/UserDetails/detailTypes";
import { connect } from "react-redux";
import ModalEdit from "./ModalEdit";
import * as userPreferenceActions from "../../actions/user/preference/userPreferenceActions";
import Spinner from "../Spinner";

const Modal = (props) => {
  const history = useHistory();

  const { search } = useLocation();
  const searchParams = new URLSearchParams(search);
  const page = searchParams.get("page");

  let rootClass = "modal fade";
  let rootStyle = { backgroundColor: "#00000061" };

  if (page) {
    rootClass += " d-block show";
    rootStyle = { backgroundColor: "#00000061" };
  }

  useEffect(() => {
    if (page === "preferences") {
      props.actions.fetchUserPreferences(props.user.id);
    }
  }, [page, props.actions, props.user.id]);

  const { isLoadingUserPreferences } = props.userPreference;

  const getSideBar = () => {
    let sidebar = detailTypes.map((detailType) => {
      return (
        <div>
          <h2
            className="d-flex align-items-center flex-shrink-0 p-3"
            style={{ background: "#f3f5f9" }}
          >
            {detailType.icon}
            <span className="ps-2 fs-5 fw-semibold">{detailType.name}</span>
          </h2>
          <div className="list-group list-group-flush border-bottom">
            {[...detailType.values]
              .filter((value) => {
                if (page === "edit") {
                  return value[0] !== "age";
                }

                return true;
              })
              .map((value) => {
                return (
                  <span
                    className="list-group-item list-group-item-action"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      history.push(`/profile?page=${page}&detail=${value[0]}`)
                    }
                  >
                    <div className="d-flex w-100 justify-content-between">
                      <h5 className="mb-1">{value[1]}</h5>
                      <span className="text-muted">
                        {page === "edit"
                          ? getSideBarDetailsInfo(value[0])
                          : getSideBarPreferencesInfo(value[0])}
                      </span>
                    </div>
                  </span>
                );
              })}
          </div>
        </div>
      );
    });

    return sidebar;
  };

  const getSideBarDetailsInfo = (infoType) => {
    return props.details && props.details[infoType].value;
  };

  const getSideBarPreferencesInfo = (infoType) => {
    if (isLoadingUserPreferences) {
      return <Spinner />;
    }

    if (infoType === "height" || infoType === "age") {
      return (
        props.preferences[infoType].min +
        " - " +
        props.preferences[infoType].max
      );
    }

    let preferences =
      props.preferences[infoType].values &&
      props.preferences[infoType].values.map((preference) => {
        return preference.value;
      });

    return preferences.length !== 0
      ? preferences.join(" | ")
      : "Add your preference";
  };

  return (
    <div>
      <div className={rootClass} style={rootStyle}>
        <div className="modal-dialog modal-dialog-centered modal-xl">
          <div className="modal-content">
            <div
              className="modal-header"
              style={{ backgroundColor: "#1a1a1a" }}
            >
              <h5 className="modal-title" style={{ color: "white" }}>
                {page === "edit" ? (
                  "Details"
                ) : (
                  <div className="d-flex row">
                    <span> My ideal person</span>
                    <span className="fs-6">
                      We prioritize recommendations based on your preferences
                      below
                    </span>
                  </div>
                )}
              </h5>
              <button
                type="button"
                className="btn-close"
                style={{ backgroundColor: "white" }}
                onClick={() => history.push("/profile")}
              ></button>
            </div>
            <div className="modal-body p-0" style={{ background: "#f3f5f9" }}>
              <div className="d-flex">
                <div className="col-6 flex-fill">
                  <div className="overflow-auto">
                    <div
                      className="d-flex flex-column align-items-stretch flex-shrink-0 bg-white"
                      style={{ height: "460px" }}
                    >
                      {getSideBar()}
                    </div>
                  </div>
                </div>
                <div className="col-6 h-100 flex-fill">
                  <ModalEdit />
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => history.push("/profile")}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    details: state.userDetails.details,
    user: state.auth,
    userPreference: state.userPreference,
    preferences: state.userPreference.preferences,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchUserPreferences: (userId) =>
        dispatch(userPreferenceActions.fetchUserPreferences(userId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Modal);

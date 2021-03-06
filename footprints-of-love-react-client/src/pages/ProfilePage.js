import React, { useEffect, useState } from "react";
import ProfileImageWithDefault from "../components/ProfileImageWithDefault";
import { connect } from "react-redux";
import { useParams } from "react-router-dom";
import moment from "moment";
import UserDetails from "../components/User/UserDetails";
import styles from "./css/profilepage.module.css";
import { Link, useHistory } from "react-router-dom";
import * as authActions from "../actions/auth/authActions";
import * as profileActions from "../actions/user/profileActions";
import * as swipeActions from "../actions/swipe/swipeActions";
import Topics from "../components/Topic/Topics";
import Spinner from "../components/Spinner";
import PhotoLightbox from "../components/PhotoLightbox";
import * as messageActions from "../actions/messages/messageActions";
import * as blockedAccountsActions from "../actions/blockedAccounts/blockedAccountsActions";

const ProfilePage = (props) => {
  let { userId } = useParams();
  let history = useHistory();

  const { session_id, id, profile_photo, first_name } = props.user;
  const { age, location } = props.details;

  useEffect(() => {
    if (userId && userId != props.authUser.id) {
      props.actions.setIsAuthUser(false);
      props.actions.getUser(userId);
    } else {
      props.actions.setIsAuthUser(true);
    }

    return () => {
      props.actions.clearProfile();
    };
  }, [props.actions, props.authUser.id, userId]);

  const displayUserHeaderInfo = () => {
    if (props.user.isFetchingUser || props.isLoadingDetails) {
      return (
        <div className="mt-5 ms-5">
          <Spinner />
        </div>
      );
    }

    let headerInfo = "";
    if (age) {
      headerInfo += `${age}`;
    }

    if (location && location.city && location.country) {
      headerInfo += ` • ${location.city}, ${location.country}`;
    }

    return (
      <div className="col-6 d-flex">
        <div className={`position-relative ${styles.img}`}>
          <ProfileImageWithDefault
            alt="profile"
            width="200"
            height="200"
            src={
              props.user.profile_photo
                ? `/${props.user.profile_photo.location}`
                : null
            }
            className={`rounded-circle shadow`}
          />
          {props.isAuthUser ? (
            <Link
              to="/profile/photos"
              type="button"
              className={`btn btn-primary mt-5 position-absolute w-50 top-50 start-50 translate-middle ${styles.btn}`}
            >
              Add
            </Link>
          ) : (
            <PhotoLightbox />
          )}
        </div>
        <div className="ps-4 pb-5 flex-fill align-self-center">
          <div className="col-12 col-md-10">
            <div className="w-100 align-baseline pe-1">
              <h5 className="mb-1 d-inline fs-1 fw-bolder">{first_name}</h5>
            </div>
            <div className="align-baseline pt-2">
              <p className="text-truncate d-inline fs-4 fw-bolder">
                {headerInfo}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const displayProfileActionButtons = () => {
    if (props.user.isFetchingUser) {
      return <Spinner />;
    }

    if (props.user.is_matched) {
      return (
        <div>
          {!props.user.is_blocked && (
            <button
              type="button"
              class="btn btn-dark col-5 ms-5 rounded-pill py-3"
              onClick={onUnmatch}
            >
              <i class="fas fa-times fa-md me-1"></i>
              UNMATCH
            </button>
          )}

          <button
            type="button"
            class="like btn btn-outline-primary ms-5 rounded-pill col-5 py-3"
            onClick={() =>
              props.actions.changeSessionStatus({
                session_id,
                user_id: id,
                profile_photo,
                first_name,
              })
            }
          >
            <i class="fas fa-comment-alt fa-md me-1"></i>
            {props.user.is_blocked ? "PREVIEW MESSAGES" : "MESSAGE"}
          </button>
        </div>
      );
    }

    if (props.user.is_liked) {
      return (
        <div>
          <button
            type="button"
            class="btn btn-dark col-5 ms-5 rounded-pill py-3"
            onClick={() => onSwipe(false)}
          >
            <i class="fas fa-times fa-md me-1"></i>
            PASS
          </button>
        </div>
      );
    }

    if (props.user.is_liked === false) {
      return (
        <div>
          <button
            onClick={() => onSwipe(true)}
            type="button"
            class={`like btn btn-outline-primary rounded-pill col-5 py-3 ${styles.like}`}
          >
            <i className="fas fa-heart fa-md me-1"></i>
            LIKE
          </button>
        </div>
      );
    }

    return (
      <div>
        <button
          onClick={() => onSwipe(true)}
          type="button"
          class={`like btn btn-outline-primary rounded-pill col-5 py-3 ${styles.like}`}
        >
          <i className="fas fa-heart fa-md me-1"></i>
          LIKE
        </button>

        <button
          onClick={() => onSwipe(false)}
          type="button"
          class="btn btn-dark col-5 ms-5 rounded-pill py-3"
        >
          <i class="fas fa-times fa-md me-1"></i>
          Pass
        </button>
      </div>
    );
  };

  const onSwipe = (isLiked) => {
    const swipe = {
      target_user_id: userId,
      liked: isLiked,
    };

    props.actions.swipe(swipe);

    if (!isLiked) {
      history.push("/discover");
    }
  };

  const onUnmatch = () => {
    props.actions.blockAccount(userId).then((response) => {
      history.push("/discover");
    });
  };

  return (
    <div className="container">
      <div className="row">
        <div className="pt-2">
          <div className="container d-flex flex-row">
            {displayUserHeaderInfo()}
            <div className="col-6 align-self-center">
              {props.isAuthUser && (
                <div className="d-flex justify-content-center">
                  <button
                    type="button"
                    className="btn btn-primary offset-5"
                    onClick={() =>
                      props.history.push("/profile?page=preferences")
                    }
                  >
                    <svg width="30" height="30">
                      <rect
                        width="30"
                        height="30"
                        rx="15"
                        fill="#0d6efd"
                      ></rect>
                      <path
                        d="M23.25 9.119H14.1C13.8 7.877 12.6 7 11.25 7S8.7 7.877 8.4 9.119H6.75c-.45 0-.75.365-.75.73 0 .366.3.73.75.73H8.4c.3 1.243 1.5 2.12 2.85 2.12a2.96 2.96 0 0 0 2.85-2.12h9.15c.45 0 .75-.364.75-.73 0-.365-.3-.73-.75-.73zm-12 2.265c-.825 0-1.575-.658-1.575-1.535 0-.803.675-1.534 1.575-1.534.825 0 1.575.658 1.575 1.534 0 .877-.75 1.535-1.575 1.535zM23.25 14.233H21.6c-.3-1.242-1.5-2.119-2.85-2.119s-2.55.877-2.85 2.119H6.75c-.45 0-.75.365-.75.73 0 .366.3.731.75.731h9.15c.3 1.242 1.5 2.119 2.85 2.119a2.96 2.96 0 0 0 2.85-2.119h1.65c.45 0 .75-.365.75-.73 0-.366-.3-.731-.75-.731zm-4.5 2.265c-.825 0-1.575-.658-1.575-1.535 0-.803.675-1.534 1.575-1.534.825 0 1.575.658 1.575 1.534 0 .877-.75 1.535-1.575 1.535zM23.25 19.347H15.6c-.3-1.242-1.5-2.119-2.85-2.119s-2.55.877-2.85 2.119H6.75c-.45 0-.75.365-.75.73 0 .366.3.731.75.731H9.9c.3 1.242 1.5 2.119 2.85 2.119a2.96 2.96 0 0 0 2.85-2.119h7.65c.45 0 .75-.365.75-.73 0-.366-.3-.731-.75-.731zm-10.5 2.265c-.825 0-1.575-.658-1.575-1.534 0-.804.675-1.535 1.575-1.535.825 0 1.575.658 1.575 1.535 0 .876-.75 1.534-1.575 1.534z"
                        fill="#fff"
                      ></path>
                    </svg>
                    <span>Preferences</span>
                  </button>

                  <Link to="/settings">
                    <button
                      type="button"
                      className="btn btn-primary px-4 py-2 ms-5"
                    >
                      <i className="fas fa-cog"></i>
                      <span className="ps-1">Settings</span>
                    </button>
                  </Link>
                </div>
              )}
              {!props.isAuthUser && displayProfileActionButtons()}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-5">
        <div className="col-8">
          <Topics user={props.user} />
        </div>
        <div className="col-4">
          {props.user.is_liked && (
            <div
              className="d-flex justify-content-center mb-3 pb-3"
              style={{ borderBottom: "2px solid #e00095" }}
            >
              <div>
                <span className="fs-3">
                  <i
                    className="fas fa-heart fa-md me-3"
                    style={{ color: "#e00095" }}
                  ></i>
                  {props.user.is_matched
                    ? "You like each other!"
                    : "You like them!"}
                </span>
              </div>
            </div>
          )}
          <UserDetails user={props.user} />
          {/* {props.isAuthUser && (
            <button
              type="button"
              class="btn btn-outline-danger mt-3 w-100"
              onClick={() => props.actions.logout(props.history)}
            >
              Logout
            </button>
          )} */}
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    user: state.profile.isAuthUser ? state.auth : state.profile,
    details: state.userDetails.details,
    authUser: state.auth,
    isAuthUser: state.profile.isAuthUser,
    isLoadingDetails: state.userDetails.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      logout: (history) => dispatch(authActions.logout(history)),
      getUser: (userId) => dispatch(profileActions.getUser(userId)),
      setIsAuthUser: (value) => dispatch(profileActions.setIsAuthUser(value)),
      clearProfile: () => dispatch(profileActions.clearProfile()),
      swipe: (swipe) => dispatch(swipeActions.swipe(swipe)),
      unmatch: (swipeId) => dispatch(swipeActions.unmatch(swipeId)),
      changeSessionStatus: (sessionDetails) =>
        dispatch(messageActions.changeSessionStatus(sessionDetails)),
      blockAccount: (userId) =>
        dispatch(blockedAccountsActions.blockAccount(userId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);

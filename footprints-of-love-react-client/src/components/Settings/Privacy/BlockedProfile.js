import React, { useState } from "react";
import ProfileImageWithDefault from "../../ProfileImageWithDefault";
import { connect } from "react-redux";
import * as blockedAccountsActions from "../../../actions/blockedAccounts/blockedAccountsActions";
import { Link } from "react-router-dom";

const BlockedProfile = (props) => {
  const { account } = props;
  const { account_id, blocked_user } = account;
  const { id, first_name, profile_photo, age } = blocked_user;

  return (
    <div className="list-group-item">
      <div className="row align-items-center">
        <div className="col-12 col-md-2">
          <ProfileImageWithDefault
            alt="profile"
            width="70"
            height="70"
            src={profile_photo ? `/${profile_photo.location}` : null}
            className={`rounded-circle shadow`}
          />
        </div>
        <div className="col-12 col-md-8">
          <div className="w-100 align-baseline pe-1">
            <Link
              to={`/profile/${id}`}
              style={{ color: "inherit", textDecoration: "none" }}
            >
              <h5 className="mb-1 d-inline">{first_name}</h5>
            </Link>
          </div>
          <div className="align-baseline">{age}</div>
        </div>
        <div className="col-12 col-md-2">
          <button
            onClick={() => props.actions.unblockAccount(account_id)}
            type="button"
            className="btn btn-secondary"
          >
            Unblock
          </button>
        </div>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      unblockAccount: (account_id) =>
        dispatch(blockedAccountsActions.unblockAccount(account_id)),
    },
  };
};

export default connect(null, mapDispatchToProps)(BlockedProfile);

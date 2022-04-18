import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import * as blockedAccountsActions from "../../../actions/blockedAccounts/blockedAccountsActions";
import BlockedProfile from "./BlockedProfile";

const BlockedProfiles = (props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchBlockedAccounts = (page) => {
      props.actions.fetchBlockedAccounts(page);
    };

    fetchBlockedAccounts(page);
  }, [page, props.actions]);

  return (
    <div>
      <h4>Blocked & unmatched profiles</h4>
      <hr></hr>
      <div className="list-group">
        {props.accounts &&
          props.accounts.map((account) => {
            return <BlockedProfile key={account.id} account={account} />;
          })}
      </div>
      {props.next && (
        <div className="d-flex justify-content-center text-center mt-2">
          <button
            type="button"
            className="btn btn-link"
            onClick={() => setPage(page + 1)}
          >
            Load More...
          </button>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    accounts: state.settings.blockedAccounts.accounts,
    next: state.settings.blockedAccounts.next,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchBlockedAccounts: (page) =>
        dispatch(blockedAccountsActions.fetchBlockedAccounts(page)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(BlockedProfiles);

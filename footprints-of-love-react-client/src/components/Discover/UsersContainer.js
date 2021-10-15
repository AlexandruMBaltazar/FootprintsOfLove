import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as discoverActions from "../../actions/discover/discoverActions";
import Spinner from "../Spinner";
import User from "./User";
import ButtonWithProgress from "../ButtonWithProgress";

const UsersContainer = (props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    props.actions.fetchPreferedUsers(page);
  }, [page, props.actions]);

  useEffect(() => {
    return () => {
      props.actions.clearPreferedUsers();
    };
  }, [props.actions]);

  const displayPreferedUsers = () => {
    if (props.preferedUsers.isLoading && page === 1) {
      return (
        <div className="mt-5">
          <Spinner />
        </div>
      );
    }

    return (
      props.preferedUsers.users &&
      props.preferedUsers.users.map((user) => {
        return (
          <div
            key={user.id}
            className="col-12 col-sm-12 col-md-12 col-lg-4 mb-5"
          >
            <User user={user} />
          </div>
        );
      })
    );
  };

  return (
    <div className="row mt-3">
      {displayPreferedUsers()}
      {props.preferedUsers.next && (
        <div>
          <ButtonWithProgress
            onClick={() => setPage(page + 1)}
            type="button"
            className="btn btn-primary btn-lg mb-5 w-50 offset-sm-3"
            disabled={props.preferedUsers.isLoading}
            pendingApiCall={props.preferedUsers.isLoading}
            text="Load More"
          >
            Load More
          </ButtonWithProgress>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    preferedUsers: state.discover.preferedUsers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchPreferedUsers: (page) =>
        dispatch(discoverActions.fetchPreferedUsers(page)),

      clearPreferedUsers: () => dispatch(discoverActions.clearPreferedUsers()),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

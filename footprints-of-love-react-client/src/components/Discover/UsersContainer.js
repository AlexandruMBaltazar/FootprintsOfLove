import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import * as discoverActions from "../../actions/discover/discoverActions";
import Spinner from "../Spinner";
import User from "./User";

const UsersContainer = (props) => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    props.actions.fetchPreferedUsers(page);
  }, [page, props.actions]);

  const displayPreferedUsers = () => {
    if (props.preferedUsers.isLoading) {
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
          <div key={user.id} className="col-sm-4 mb-5">
            <User user={user} />
          </div>
        );
      })
    );
  };

  return <div className="row mt-3">{displayPreferedUsers()}</div>;
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
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UsersContainer);

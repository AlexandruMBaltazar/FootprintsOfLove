import React, { useEffect, useState } from "react";
import User from "./User";
import { connect } from "react-redux";
import * as likeActions from "../../actions/likes/likeActions";

const UserRows = (props) => {
  const [headerInfo, setHeaderInfo] = useState({
    header: "",
    subHead: "",
  });

  useEffect(() => {
    const displayUsersInfo = () => {
      switch (props.type) {
        case "likedUsers":
          setHeaderInfo({
            header: "People that like you",
            subHead: "Like them to create a match!",
          });

          break;
        default:
          setHeaderInfo({
            header: "People you like",
            subHead: "Send an intro message to them!",
          });
          props.actions.fetchLikes(props.type);
      }
    };

    displayUsersInfo();
  }, [props.actions, props.type]);

  return (
    <div>
      <div className="pb-4">
        <span className="fs-5">{headerInfo.header}</span>
        <p class="text-black-50">{headerInfo.subHead}</p>
      </div>
      <div className="row">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((counter) => (
          <User />
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.likes.users,
    isFetchingLikes: state.likes.isFetchingLikes,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchLikes: (type) => dispatch(likeActions.fetchLikes(type)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRows);

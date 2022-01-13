import React, { useEffect, useState } from "react";
import User from "./User";
import { connect } from "react-redux";
import * as likeActions from "../../actions/likes/likeActions";
import Spinner from "../Spinner";
import ButtonWithProgress from "../ButtonWithProgress";

const UserRows = (props) => {
  const [headerInfo, setHeaderInfo] = useState({
    header: "",
    subHead: "",
  });

  const [page, setPage] = useState(1);

  useEffect(() => {
    return () => {
      props.actions.clearLikes();
      setPage(1);
    };
  }, [props.actions, props.type]);

  useEffect(() => {
    const displayUsersInfo = () => {
      switch (props.type) {
        case "likedUsers":
          setHeaderInfo({
            header: "People you like",
            subHead:
              "When there is a match you will be able to send them a message!",
          });

          props.actions.fetchLikes(props.type, page);

          break;
        case "dislikedUsers":
          setHeaderInfo({
            header: "People you dislike",
            subHead: "Have you changed your mind ? You can like them again !",
          });

          props.actions.fetchLikes(props.type, page);

          break;
        default:
          setHeaderInfo({
            header: "People that like you",
            subHead: "Like them to create a match!",
          });
          props.actions.fetchLikes(props.type, page);
      }
    };

    displayUsersInfo();
  }, [page, props.actions, props.type]);

  const displayUsers = () => {
    if (props.isFetchingLikes && page === 1) {
      return (
        <div className="mt-5">
          <Spinner />
        </div>
      );
    }

    return props.users.map((user) => {
      return (
        <User
          key={user.id}
          user={user}
          likeNotification={props.notifications.find(
            (notification) => notification.user_id === user.id
          )}
        />
      );
    });
  };

  return (
    <div>
      <div className="pb-4">
        <span className="fs-5">{headerInfo.header}</span>
        <p className="text-black-50">{headerInfo.subHead}</p>
      </div>
      <div className="row">{displayUsers()}</div>
      <div className="row mt-3">
        {props.next && (
          <div>
            <ButtonWithProgress
              onClick={() => setPage(page + 1)}
              type="button"
              className="btn btn-primary btn-lg mb-5 w-50 offset-sm-3"
              disabled={props.isFetchingLikes}
              pendingApiCall={props.isFetchingLikes}
              text="Load More"
            >
              Load More
            </ButtonWithProgress>
          </div>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    users: state.likes.users,
    next: state.likes.next,
    isFetchingLikes: state.likes.isFetchingLikes,
    notifications: state.notification.likeNotifications,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      fetchLikes: (type, page) => dispatch(likeActions.fetchLikes(type, page)),
      clearLikes: () => dispatch(likeActions.clearLikes()),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRows);

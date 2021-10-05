import React, { useEffect } from "react";
import { connect } from "react-redux";
import * as topicActions from "../../actions/topic/topicActions";
import Topic from "./Topic";
import Spinner from "../Spinner";

const Topics = (props) => {
  useEffect(() => {
    props.actions.getTopics(props.user.id);
  }, [props.actions, props.user.id]);

  const displayTopics = () => {
    if (props.isLoading) {
      return <Spinner />;
    }

    return (
      <div>
        {props.topics &&
          props.topics.map((topic) => {
            return <Topic key={topic.id} topic={topic} />;
          })}
      </div>
    );
  };

  return displayTopics();
};

const mapStateToProps = (state) => {
  return {
    user: state.auth,
    topics: state.topic.topics,
    isLoading: state.topic.isLoading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      getTopics: (userId) => dispatch(topicActions.getTopics(userId)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topics);

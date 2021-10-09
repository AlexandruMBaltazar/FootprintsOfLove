import React, { useState, useEffect } from "react";
import styles from "./topic.module.css";
import { connect } from "react-redux";
import * as topicActions from "../../actions/topic/topicActions";
import ButtonWithProgress from "../ButtonWithProgress";

const Topic = (props) => {
  const [edit, setEdit] = useState(false);
  const [topicEssay, setTopicEssay] = useState("");

  const { name, answer } = props.topic;

  useEffect(() => {
    if (answer && answer.value) {
      setTopicEssay(answer.value);
    }
  }, [answer]);

  const onClickCancel = () => {
    setEdit(false);
    setTopicEssay(answer && answer.value ? answer.value : "");
  };

  const onClickSave = () => {
    props.actions
      .postTopicAnswer(props.topic.id, { value: topicEssay })
      .then((response) => {
        setEdit(false);
      });
  };

  const displayEditTopic = () => {
    if (edit) {
      return (
        <div>
          <textarea
            className="form-control"
            rows="5"
            placeholder="Write something interesting about you!"
            onChange={(event) => setTopicEssay(String(event.target.value))}
            value={topicEssay}
          ></textarea>
          <div className="mt-2 float-end">
            <button
              type="button"
              className="btn btn-secondary me-3 px-5"
              onClick={onClickCancel}
            >
              Close
            </button>
            <ButtonWithProgress
              type="submit"
              className="btn btn-primary px-5"
              onClick={onClickSave}
              disabled={props.pendingApiCall}
              pendingApiCall={props.pendingApiCall}
              text="Save"
            />
          </div>
        </div>
      );
    }

    return (
      <p className="card-text">
        {answer && answer.value
          ? answer.value
          : props.isAuthUser
          ? "Write something interesting about you!"
          : "No details were added by the user yet!"}
        {props.isAuthUser && (
          <span className={`ps-2 ${styles.span}`} onClick={() => setEdit(true)}>
            <i class="fas fa-pencil-alt pe-1"></i>WRITE
          </span>
        )}
      </p>
    );
  };

  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{name}</h5>
        {displayEditTopic()}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    pendingApiCall: state.topic.pendingApiCall,
    isAuthUser: state.profile.isAuthUser,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    actions: {
      postTopicAnswer: (topicId, answer) =>
        dispatch(topicActions.postTopicAnswer(topicId, answer)),
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Topic);

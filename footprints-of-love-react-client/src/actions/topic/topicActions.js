import * as apiCalls from "../../api/apiCalls";
import {
  FETCH_TOPICS,
  ADD_TOPIC_ANSWER,
  IS_ADDING_TOPIC_ANSWER,
  IS_FETCHING_TOPICS,
} from "./types";

export const getTopics = (userId) => (dispatch) => {
  dispatch({
    type: IS_FETCHING_TOPICS,
    payload: true,
  });
  return apiCalls.getTopics(userId).then((response) => {
    dispatch({
      type: FETCH_TOPICS,
      payload: response.data.data,
    });
  });
};

export const postTopicAnswer = (topicId, answer) => (dispatch) => {
  dispatch({
    type: IS_ADDING_TOPIC_ANSWER,
    payload: true,
  });
  return apiCalls.postTopicAnswer(topicId, answer).then((response) => {
    dispatch({
      type: ADD_TOPIC_ANSWER,
      payload: response.data.data,
    });
    return response;
  });
};

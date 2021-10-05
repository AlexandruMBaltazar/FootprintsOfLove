import {
  FETCH_TOPICS,
  ADD_TOPIC_ANSWER,
  IS_ADDING_TOPIC_ANSWER,
  IS_FETCHING_TOPICS,
} from "../../actions/topic/types";

const initialState = {
  topics: [],
  pendingApiCall: false,
  isLoading: false,
};

export default function photoReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_TOPICS:
      return {
        ...state,
        topics: action.payload,
        isLoading: false,
      };

    case IS_FETCHING_TOPICS:
      return {
        ...state,
        isLoading: true,
      };

    case ADD_TOPIC_ANSWER:
      return {
        ...state,
        topics: state.topics.map((topic) => {
          if (topic.id === action.payload.topic_id) {
            topic.answer = action.payload;
          }
          return topic;
        }),
        pendingApiCall: false,
      };

    case IS_ADDING_TOPIC_ANSWER:
      return {
        ...state,
        pendingApiCall: true,
      };

    default:
      return state;
  }
}

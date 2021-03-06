import { combineReducers } from "redux";
import authReducer from "./auth/authReducer";
import userDetailsReducer from "./user/details/userDetailsReducer";
import photoReducer from "./photo/photoReducer";
import userPreferenceReducer from "./user/preference/userPreferenceReducer";
import discoverReducer from "./discover/discoverReducer";
import topicReducer from "./topics/topicReducer";
import profileReducer from "./user/profileReducer";
import sessionReducer from "./session/sessionReducer";
import messageReducer from "./messages/messageReducer";
import notificationReducer from "./notifications/notificationReducer";
import likeReducer from "./likes/likeReducer";
import settingsReducer from "./settings/settingsReducer";
import videoCallReducer from "./videoCall/videoCallReducer";

export default combineReducers({
  auth: authReducer,
  profile: profileReducer,
  userDetails: userDetailsReducer,
  photo: photoReducer,
  userPreference: userPreferenceReducer,
  discover: discoverReducer,
  topic: topicReducer,
  session: sessionReducer,
  message: messageReducer,
  notification: notificationReducer,
  likes: likeReducer,
  settings: settingsReducer,
  videoCall: videoCallReducer,
});

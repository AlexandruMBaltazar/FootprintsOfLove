import * as apiCalls from "../../api/apiCalls";
import { LOCATION_ADDED, REMOVE_LOCATION } from "./types";
import { LOADING_USER_DETAILS } from "../user/details/types";

export const searchLocation =
  ({ country, city }) =>
  (dispatch) => {
    return apiCalls.searchLocation(country.label, city).then((response) => {
      return response.data;
    });
  };

export const addLocation = (location) => (dispatch) => {
  dispatch({
    type: LOADING_USER_DETAILS,
    payload: true,
  });
  return apiCalls.addLocation(location).then((response) => {
    dispatch({
      type: LOCATION_ADDED,
      payload: response.data.data,
    });
  });
};

export const deleteLocation = (location_id) => (dispatch) => {
  return apiCalls.deleteLocation(location_id).then((response) => {
    dispatch({
      type: REMOVE_LOCATION,
      payload: location_id,
    });
  });
};

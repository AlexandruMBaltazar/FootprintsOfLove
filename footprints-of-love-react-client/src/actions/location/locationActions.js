import * as apiCalls from "../../api/apiCalls";
import { SEARCH_LOCATION, LOCATION_ADDED } from "./types";
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

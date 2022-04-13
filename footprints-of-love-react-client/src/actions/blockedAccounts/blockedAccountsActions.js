import { UNBLOCK_ACCOUNT, FETCH_BLOCKED_ACCOUNTS } from "./types";
import * as apiCalls from "../../api/apiCalls";

export const blockAccount = (userId) => (dispatch) => {
  return apiCalls.postBlockedAccounts({ user_id: userId });
};

export const fetchBlockedAccounts =
  (page = 1) =>
  (dispatch) => {
    return apiCalls.getBlockedAccounts(page).then((response) => {
      dispatch({
        type: FETCH_BLOCKED_ACCOUNTS,
        payload: response.data,
      });
    });
  };

export const unblockAccount = (account_id) => (dispatch) => {
  return apiCalls.deleteBlockedAccounts(account_id).then((response) => {
    dispatch({
      type: UNBLOCK_ACCOUNT,
      payload: response.data,
    });
  });
};

import { BLOCK_ACCOUNT } from "./types";
import * as apiCalls from "../../api/apiCalls";

export const blockAccount = (userId) => (dispatch) => {
  return apiCalls.postBlockedAccounts({ user_id: userId });
};

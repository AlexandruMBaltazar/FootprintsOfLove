import {
  FETCH_BLOCKED_ACCOUNTS,
  UNBLOCK_ACCOUNT,
} from "../../actions/blockedAccounts/types";

const initialState = {
  blockedAccounts: {
    accounts: [],
    next: "",
  },
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_BLOCKED_ACCOUNTS:
      return {
        ...state,
        blockedAccounts: {
          accounts: [
            ...state.blockedAccounts.accounts,
            ...action.payload.data.filter((newAccount) => {
              return state.blockedAccounts.accounts.length > 0
                ? !state.blockedAccounts.accounts.some(
                    (account) => account.account_id === newAccount.account_id
                  )
                : true;
            }),
          ],
          next: action.payload.links.next,
        },
      };

    case UNBLOCK_ACCOUNT:
      return {
        ...state,
        blockedAccounts: {
          accounts: state.blockedAccounts.accounts.filter((account) => {
            return account.account_id !== action.payload.data.account_id;
          }),
        },
      };

    default:
      return state;
  }
}

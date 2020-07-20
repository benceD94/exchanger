import { ADD_TO_EUR_WALLET, ADD_TO_GBP_WALLET, ADD_TO_USD_WALLET } from "../actionTypes";

/**
 * Wallet with 3 currencies and some random money in it.
 */
const initialState = {
  EUR: 40.34,
  USD: 12.2,
  GBP: 1234.5
};

/**
 * Add money to one of the wallets
 * @param {*} state 
 * @param {*} action 
 */
export default function(state = initialState, action) {
  switch (action.type) {
    case ADD_TO_EUR_WALLET: {
      const { value } = action.payload;
      return {
        ...state,
        EUR: state.EUR + value,
      };
    }
    case ADD_TO_GBP_WALLET: {
      const { value } = action.payload;
      return {
        ...state,
        GBP: state.GBP + value,
      };
    }
    case ADD_TO_USD_WALLET: {
      const { value } = action.payload;
      return {
        ...state,
        USD: state.USD + value,
      };
    }
    default:
      return state;
  }
}

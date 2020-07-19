import { 
  UPDATE_EXCHANGE_RATE_FOR_EUR,
  UPDATE_EXCHANGE_RATE_FOR_USD,
  UPDATE_EXCHANGE_RATE_FOR_GBP } from "../actionTypes";

const initialState = {
  EUR: {},
  USD: {},
  GBP: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case UPDATE_EXCHANGE_RATE_FOR_EUR: {
      const { content } = action.payload;
      return {
        ...state,
        EUR: content
      };
    }
    case UPDATE_EXCHANGE_RATE_FOR_USD: {
      const { content } = action.payload;
      return {
        ...state,
        USD: content
      };
    }
    case UPDATE_EXCHANGE_RATE_FOR_GBP: {
      const { content } = action.payload;
      return {
        ...state,
        GBP: content
      };
    }
    default:
      return state;
  }
}

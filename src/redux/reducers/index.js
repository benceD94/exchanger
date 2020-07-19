import { combineReducers } from "redux"
import exchangeRates from "./exchangeRates";
import wallet from "./wallet";

export default combineReducers({ exchangeRates, wallet });

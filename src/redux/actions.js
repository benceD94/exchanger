import {
  UPDATE_EXCHANGE_RATE_FOR_EUR,
  UPDATE_EXCHANGE_RATE_FOR_USD,
  UPDATE_EXCHANGE_RATE_FOR_GBP,
  ADD_TO_EUR_WALLET,
  ADD_TO_GBP_WALLET,
  ADD_TO_USD_WALLET
} from './actionTypes';

export const changeRateForEur = content => ({
  type: UPDATE_EXCHANGE_RATE_FOR_EUR,
  payload: {
    content
  }
});

export const changeRateForUsd = content => ({
  type: UPDATE_EXCHANGE_RATE_FOR_USD,
  payload: {
    content
  }
});

export const changeRateForGbp = content => ({
  type: UPDATE_EXCHANGE_RATE_FOR_GBP,
  payload: {
    content
  }
});

export const addToEurWallet = value => ({
  type: ADD_TO_EUR_WALLET,
  payload: {
    value
  }
});

export const addToGbpWallet = value => ({
  type: ADD_TO_GBP_WALLET,
  payload: {
    value
  }
});

export const addToUsdWallet = value => ({
  type: ADD_TO_USD_WALLET,
  payload: {
    value
  }
});
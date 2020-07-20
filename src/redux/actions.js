import {
  UPDATE_EXCHANGE_RATE_FOR_EUR,
  UPDATE_EXCHANGE_RATE_FOR_USD,
  UPDATE_EXCHANGE_RATE_FOR_GBP,
  ADD_TO_EUR_WALLET,
  ADD_TO_GBP_WALLET,
  ADD_TO_USD_WALLET
} from './actionTypes';

/**
 * Update exhcange rate for EUR
 * @param {Object} content Containing exchange rate for USD and GBP
 */
export const changeRateForEur = content => ({
  type: UPDATE_EXCHANGE_RATE_FOR_EUR,
  payload: {
    content
  }
});

/**
 * Update exhcange rate for USD
 * @param {Object} content Containing exchange rate for EUR and GBP
 */
export const changeRateForUsd = content => ({
  type: UPDATE_EXCHANGE_RATE_FOR_USD,
  payload: {
    content
  }
});


/**
 * Update exhcange rate for GBP
 * @param {Object} content Containing exchange rate for USD and EUR
 */
export const changeRateForGbp = content => ({
  type: UPDATE_EXCHANGE_RATE_FOR_GBP,
  payload: {
    content
  }
});

/**
 * Add money to the EUR wallet
 * @param {Number} value Money to be added to the wallet
 */
export const addToEurWallet = value => ({
  type: ADD_TO_EUR_WALLET,
  payload: {
    value
  }
});

/**
 * Add money to the GBP wallet
 * @param {Number} value Money to be added to the wallet
 */
export const addToGbpWallet = value => ({
  type: ADD_TO_GBP_WALLET,
  payload: {
    value
  }
});

/**
 * Add money to the USD wallet
 * @param {Number} value Money to be added to the wallet
 */
export const addToUsdWallet = value => ({
  type: ADD_TO_USD_WALLET,
  payload: {
    value
  }
});
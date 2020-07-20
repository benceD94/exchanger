import exchangeRates from "./exchangeRates";
import * as types from '../actionTypes'

const initialExchangeRates = {
  EUR: {},
  USD: {},
  GBP: {}
};

describe('ExchangeRates reducer', () => {
  it('should return the initial state', () => {
    expect(exchangeRates(undefined, {})).toEqual(initialExchangeRates)
  })

  it('should handle UPDATE_EXCHANGE_RATE_FOR_EUR', () => {
    expect(exchangeRates(initialExchangeRates, {
      type: types.UPDATE_EXCHANGE_RATE_FOR_EUR,
      payload: {
        content: {
          GBP: 1,
          USD: 2
        }
      }
    })).toEqual({"EUR": {GBP: 1, USD: 2}, "GBP": {}, "USD": {}})
  })

  it('should handle UPDATE_EXCHANGE_RATE_FOR_USD', () => {
    expect(exchangeRates(initialExchangeRates, {
      type: types.UPDATE_EXCHANGE_RATE_FOR_USD,
      payload: {
        content: {
          GBP: 1,
          USD: 2
        }
      }
    })).toEqual({"EUR": {}, "GBP": {}, "USD": {GBP: 1, USD: 2}})
  })

  it('should handle UPDATE_EXCHANGE_RATE_FOR_GBP', () => {
    expect(exchangeRates(initialExchangeRates, {
      type: types.UPDATE_EXCHANGE_RATE_FOR_GBP,
      payload: {
        content: {
          GBP: 1,
          USD: 2
        }
      }
    })).toEqual({"EUR": {}, "GBP": {GBP: 1, USD: 2}, "USD": {}})
  })
})
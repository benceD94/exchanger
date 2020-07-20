import wallet from "./wallet";
import * as types from '../actionTypes'

const initalWallet = {
  EUR: 40.34,
  USD: 12.2,
  GBP: 1234.5
};

describe('Wallet reducer', () => {
  it('should return the initial state', () => {
    expect(wallet(undefined, {})).toEqual(initalWallet)
  })

  it('should handle ADD_TO_EUR_WALLET', () => {
    expect(wallet(initalWallet, {
      type: types.ADD_TO_EUR_WALLET,
      payload: {
        value: 3
      }
    })).toEqual({"EUR": 43.34, "GBP": 1234.5, "USD": 12.2})
  })

  it('should handle ADD_TO_GBP_WALLET', () => {
    expect(wallet(initalWallet, {
      type: types.ADD_TO_GBP_WALLET,
      payload: {
        value: 3
      }
    })).toEqual({"EUR": 40.34, "GBP": 1237.5, "USD": 12.2})
  })

  it('should handle ADD_TO_USD_WALLET', () => {
    expect(wallet(initalWallet, {
      type: types.ADD_TO_USD_WALLET,
      payload: {
        value: 3
      }
    })).toEqual({"EUR": 40.34, "GBP": 1234.5, "USD": 15.2})
  })
})
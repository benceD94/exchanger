/**
 * Get all wallets from the store
 * @param {*} store 
 */
export const getWallet = store => store.wallet;


/**
 * Get all exchanges rates from the store
 * @param {*} store 
 */
export const getExchangeRates = store => store.exchangeRates;

/**
 * Get specific wallet from store
 * @param {*} store 
 * @param {String} currency Currencyto be loaded from the store
 */
export const getWalletForCurrency = (store, currency) => {
  const allWallets = getWallet(store);
  switch (currency) {
    case "EUR":
      return allWallets.EUR;
    case "USD":
      return allWallets.USD;
    case "GBP":
      return allWallets.GBP;
    default:
      return allWallets;
  }
};

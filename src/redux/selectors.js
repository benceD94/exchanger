export const getWallet = store => store.wallet;

export const getExchangeRates = store => store.exchangeRates;

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

import React from "react";
import { connect } from "react-redux";
import axios from 'axios';
import { Grid, IconButton, TextField, InputLabel, NativeSelect } from '@material-ui/core';
import SyncIcon from '@material-ui/icons/Sync';
import { changeRateForEur, changeRateForUsd, changeRateForGbp, addToEurWallet, addToGbpWallet, addToUsdWallet } from "../redux/actions";
import { getExchangeRates, getWallet } from "../redux/selectors";

class Exchanger extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      exchangeFromValue: 0,
      exchangeToValue: 0,
      exchangeFrom: "USD",
      exchangeTo: "EUR"
    };
  }

  /**
   * Move money between wallets
   */
  exchangeMoney = () => {
    const exchangeResultValue = this.state.exchangeFromValue * this.props.exchangeRates[this.state.exchangeFrom][this.state.exchangeTo];

    /**
     * Add money to wallet selected from user
     */
    switch (this.state.exchangeTo) {
      case 'EUR':
        this.props.addToEurWallet(exchangeResultValue);
        break;
      case 'USD':
        this.props.addToUsdWallet(exchangeResultValue);
        break;
      case 'GBP':
        this.props.addToGbpWallet(exchangeResultValue);
        break;
    }

    /**
     * Remove money to wallet selected from user
     */
    switch (this.state.exchangeFrom) {
      case 'EUR':
        this.props.addToEurWallet(this.state.exchangeFromValue * -1);
        break;
      case 'USD':
        this.props.addToUsdWallet(this.state.exchangeFromValue * -1);
        break;
      case 'GBP':
        this.props.addToGbpWallet(this.state.exchangeFromValue * -1);
        break;
    }
  }

  /**
   * Fetch exchange rate from API
   * @param {String} base Base currency for Exchange
   * @param {String} symbols Currencies to be loaded for exchange (reduces data by not loading all currencies)
   */
  getExchangeRate(base, symbols) {
    return axios.get(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`);
  }

  /**
   * Call getExchangeRate for all currencies in wallet
   */
  watchExchangeRate() {
    this.getExchangeRate('EUR', 'USD,GBP').then(res => {
      this.props.changeRateForEur(res.data.rates);
    });
    this.getExchangeRate('USD', 'EUR,GBP').then(res => {
      this.props.changeRateForUsd(res.data.rates);
    });
    this.getExchangeRate('GBP', 'USD,EUR').then(res => {
      this.props.changeRateForGbp(res.data.rates);
    });
  }

  /**
   * Trigger exchange rate fetch every 10 seconds
   */
  componentDidMount() {
    this.watchExchangeRate();
    setInterval(() => {
      this.watchExchangeRate();
    }, 10000);
  }

  render() {
    /**
     * On select change, update state
     * @param {Event} e Select input change event
     */
    const handleCurrencyChange = (e) => {
      const name = e.target.name;
      this.setState({
        ...this.state,
        [name]: e.target.value,
      });
    };

    /**
     * On input change, update input on the other side.
     * Only allow 2 digits after the decimal sign.
     * Don't allow negative value.
     * @param {Event} e Select input change event
     */
    const handleNumberChange = (e) => {
      const t = e.target.value;
      const newValue = (t.indexOf(".") >= 0) || t < 0 ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
      if (newValue && newValue.length) {
        if (e.target.name === "exchangeFromValue") {
          this.setState({
            ...this.state,
            exchangeFromValue: newValue,
            exchangeToValue: Number(newValue * this.props.exchangeRates[this.state.exchangeFrom][this.state.exchangeTo]).toFixed(2)
          });
        } else {
          this.setState({
            ...this.state,
            exchangeFromValue: Number(newValue / this.props.exchangeRates[this.state.exchangeFrom][this.state.exchangeTo]).toFixed(2),
            exchangeToValue: newValue
          });
        }
      }
    };

    return (
      <Grid container spacing={5} alignContent="center" justify="center">
        <Grid item>
          <form noValidate autoComplete="off">
            <TextField
              type="number"
              label={`Exchange from ${this.state.exchangeFrom}`}
              onChange={handleNumberChange}
              value={this.state.exchangeFromValue}
              inputProps={{
                name: 'exchangeFromValue',
                id: 'exchange-value-input',
              }}
            />
            <InputLabel id="exchange-from-selector-label">Select currency</InputLabel>
            <NativeSelect
              value={this.state.exchangeFrom}
              onChange={handleCurrencyChange}
              inputProps={{
                name: 'exchangeFrom',
                id: 'exchange-from-selector',
              }}
            >
              <option value={'USD'} disabled={this.state.exchangeTo === 'USD'}>USD</option>
              <option value={'EUR'} disabled={this.state.exchangeTo === 'EUR'}>EUR</option>
              <option value={'GBP'} disabled={this.state.exchangeTo === 'GBP'}>GBP</option>
            </NativeSelect>
          </form>
        </Grid>
        <Grid item>
          <IconButton disabled={this.props.wallet[this.state.exchangeFrom] < this.state.exchangeFromValue} aria-label="exchange" color="primary" onClick={() => this.exchangeMoney()}>
            <SyncIcon />
          </IconButton>
          <div>
            1 = {Number(this.props.exchangeRates[this.state.exchangeFrom][this.state.exchangeTo]).toFixed(2)}
          </div>
        </Grid>
        <Grid item>
          <form noValidate autoComplete="off">
            <TextField
              type="number"
              label={`Exchange to ${this.state.exchangeTo}`}
              onChange={handleNumberChange}
              value={this.state.exchangeToValue}
              inputProps={{
                name: 'exchangeToValue',
                id: 'exchange-to-value-input',
              }}
            />
            <InputLabel id="exchange-to-selector-label">Select currency</InputLabel>
            <NativeSelect
              value={this.state.exchangeTo}
              onChange={handleCurrencyChange}
              inputProps={{
                name: 'exchangeTo',
                id: 'exchange-from-selector',
              }}
            >
              <option value={'USD'} disabled={this.state.exchangeFrom === 'USD'}>USD</option>
              <option value={'EUR'} disabled={this.state.exchangeFrom === 'EUR'}>EUR</option>
              <option value={'GBP'} disabled={this.state.exchangeFrom === 'GBP'}>GBP</option>
            </NativeSelect>
          </form>
        </Grid>
      </Grid>
    );
  }
}

/**
 * Load echangeRates and wallet from store
 * @param {*} state 
 */
const mapStateToProps = (state) => {
  const exchangeRates = getExchangeRates(state);
  const wallet = getWallet(state);
  return { exchangeRates, wallet }
};

export default connect(
  mapStateToProps,
  {
    changeRateForEur,
    changeRateForUsd,
    changeRateForGbp,
    addToEurWallet,
    addToGbpWallet,
    addToUsdWallet
  }
)(Exchanger);

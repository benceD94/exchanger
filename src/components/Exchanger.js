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
      exchangeValue: 0,
      exchangeFrom: "USD",
      exchangeTo: "EUR"
    };
  }

  exchangeMoney = () => {
    const exchangeResultValue = this.state.exchangeValue * this.props.exchangeRates[this.state.exchangeFrom][this.state.exchangeTo];

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

    switch (this.state.exchangeFrom) {
      case 'EUR':
        this.props.addToEurWallet(this.state.exchangeValue * -1);
        break;
      case 'USD':
        this.props.addToUsdWallet(this.state.exchangeValue * -1);
        break;
      case 'GBP':
        this.props.addToGbpWallet(this.state.exchangeValue * -1);
        break;
    }
  }

  getExchangeRate(base, symbols) {
    return axios.get(`https://api.exchangeratesapi.io/latest?base=${base}&symbols=${symbols}`);
  }

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

  componentDidMount() {
    this.watchExchangeRate();
    setInterval(() => {
      this.watchExchangeRate();
    }, 10000);
  }

  render() {
    const handleCurrencyChange = (e) => {
      const name = e.target.name;
      this.setState({
        ...this.state,
        [name]: e.target.value,
      });
    };

    const handleNumberChange = (e) => {
      const t = e.target.value;
      e.target.value = (t.indexOf(".") >= 0) ? (t.substr(0, t.indexOf(".")) + t.substr(t.indexOf("."), 3)) : t;
      const name = e.target.name;
      this.setState({
        ...this.state,
        [name]: e.target.value,
      });
    };

    return (
      <Grid container spacing={5} alignContent="center" justify="center">
        <Grid item>
          <form noValidate autoComplete="off">
            <TextField
              type="number"
              label={`Exchange from ${this.state.exchangeFrom}`}
              onChange={handleNumberChange}
              inputProps={{
                name: 'exchangeValue',
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
              <option value={'USD'}>USD</option>
              <option value={'EUR'}>EUR</option>
              <option value={'GBP'}>GBP</option>
            </NativeSelect>
          </form>
        </Grid>
        <Grid item>
          <IconButton disabled={this.props.wallet[this.state.exchangeFrom] < this.state.exchangeValue} aria-label="exchange" color="primary" onClick={() => this.exchangeMoney()}>
            <SyncIcon />
          </IconButton>
          <div>
            1 = {Number(this.props.exchangeRates[this.state.exchangeFrom][this.state.exchangeTo]).toFixed(2)}
          </div>
        </Grid>
        <Grid item>
          <form noValidate autoComplete="off">
            <p>
            {Number(this.state.exchangeValue * this.props.exchangeRates[this.state.exchangeFrom][this.state.exchangeTo]).toFixed(2)}
            </p>
            <InputLabel id="exchange-to-selector-label">Select currency</InputLabel>
            <NativeSelect
              value={this.state.exchangeTo}
              onChange={handleCurrencyChange}
              inputProps={{
                name: 'exchangeTo',
                id: 'exchange-from-selector',
              }}
            >
              <option value={'USD'}>USD</option>
              <option value={'EUR'}>EUR</option>
              <option value={'GBP'}>GBP</option>
            </NativeSelect>
          </form>
        </Grid>
      </Grid>
    );
  }
}

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

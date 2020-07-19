import React from 'react';
import { Divider, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import './App.css';

import Wallet from './components/Wallet';
import Exchanger from './components/Exchanger';


const useStyles = makeStyles((theme) => ({
  divider: {
    margin: theme.spacing(2, 0),
  }
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
      <h1>Exchanger</h1>
      <Grid container spacing={5} alignContent="center" justify="center">
        <Grid item>
          <Wallet currency="EUR" />
        </Grid>
        <Grid item>
          <Wallet currency="USD" />
        </Grid>
        <Grid item>
          <Wallet currency="GBP" />
        </Grid>
      </Grid>
      <Divider className={classes.divider} />
      <Exchanger />
    </div>
  );
}

export default App;

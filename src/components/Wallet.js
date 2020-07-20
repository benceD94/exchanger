import React from "react";
import { connect } from "react-redux";
import { makeStyles } from '@material-ui/core/styles';
import { getWalletForCurrency } from "../redux/selectors";
import { Paper } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    whiteSpace: 'nowrap',
    marginBottom: theme.spacing(1),
  }
}));

/**
 * Render a wallet with content from store
 * @param {*} props 
 */
function Wallet(props) {
  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <h2>{Number(props.walletContent).toFixed(2)}</h2>
      <h3>{props.currency}</h3>
    </Paper>
  );
}

/**
 * Get Wallet information from store
 * @param {*} state 
 * @param {*} ownProps 
 */
const mapStateToProps = (state, ownProps) => {
  const walletContent = getWalletForCurrency(state, ownProps.currency);
  return { walletContent }
};

export default connect(
  mapStateToProps
)(Wallet);

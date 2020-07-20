import React from 'react';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from '../redux/store';
import Wallet from '../components/Wallet';

test('renders Wallet with given currency and value from the store', () => {
  const { getByText } = render(
    <Provider store={store}>
      <Wallet currency="EUR"/>
    </Provider>
  );

  expect(getByText(/EUR/i)).toBeInTheDocument();
  expect(getByText(/40.34/i)).toBeInTheDocument();
});

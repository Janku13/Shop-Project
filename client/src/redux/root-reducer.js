import { combineReducers } from 'redux';

import { cartReducer } from './cart/cart.reducer';
import { currencyReducer } from './currency/currency.reducer';

const rootReducer = combineReducers({
  cart: cartReducer,
  showCurrency: currencyReducer,
});

export default rootReducer;

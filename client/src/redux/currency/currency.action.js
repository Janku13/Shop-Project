import CurrencyActionTypes from './currency.types';

export const chooseCurrency = (selectedCurrency) => ({
  type: CurrencyActionTypes.SELECT_CURRENCY,
  payload: selectedCurrency,
});

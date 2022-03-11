import React from 'react';
import { connect } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CURRENCIES } from '../../gql_query/data-query';
import { chooseCurrency } from '../../redux/currency/currency.action';

const ChoosePrice = ({ handleCurrencyChange, currency }) => {
  const { category } = useParams();
  const isTitle = category ? category : 'all';

  const { loading, error, data } = useQuery(GET_CURRENCIES);
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) return <p>Error :(</p>;

  const chooseOption = data.currencies.map((currency) => {
    return (
      <option key={currency.label} value={currency.label}>
        {currency.symbol} {currency.label}
      </option>
    );
  });
  return (
    <div className="choose-price">
      <select
        className="price-drop"
        value={currency}
        onChange={(event) => handleCurrencyChange(event.target.value)}
      >
        {chooseOption}
      </select>
    </div>
  );
};
const mapStateToProps = (state) => ({
  currency: state.showCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  handleCurrencyChange: (e) => dispatch(chooseCurrency(e)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChoosePrice);

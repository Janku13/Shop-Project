import React, { Component } from 'react';
import { connect } from 'react-redux';
import { removeItem, addItem } from '../../redux/cart/cart.action';
import './cart-item.styles.css';

class CartItems extends Component {
  render() {
    const item = this.props.item;
    const currency = this.props.currency;
    const removeItem = this.props.removeItem;
    const addItem = this.props.addItem;
    console.log(item);
    const findingCurrency = item.prices.filter((product) => {
      return product.currency.label === currency;
    });
    return (
      <div className="cart-item">
        <div className="item-details">
          <div className="collection-footer">
            <span className="name">{item.name}</span>
            <p className="price">
              {findingCurrency[0].currency.symbol}
              {findingCurrency[0].amount}{' '}
            </p>
          </div>
        </div>
        <div>
          <span>{item.quantity}</span>
        </div>
        <div>
          <span onClick={() => addItem(item)}>add item</span>
          <span onClick={() => removeItem(item)}>remove item</span>
        </div>
        <img className="cart-img" src={`${item.gallery[0]}`} alt="item" />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  currency: state.showCurrency.currency,
});
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (toRemoveItem) => dispatch(removeItem(toRemoveItem)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CartItems);

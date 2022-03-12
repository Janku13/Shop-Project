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
    const findingCurrency = item.prices.filter((product) => {
      return product.currency.label === currency;
    });
    return (
      <div>
        <div className="cart-item">
          <div className="item-details">
            <div className="collection-footer">
              <span className="name">{item.name}</span>
              <p className="price">
                {findingCurrency[0].currency.symbol}
                {findingCurrency[0].amount * item.quantity}{' '}
              </p>
            </div>
          </div>
          <div className="add-delete-arrows">
            <span className="pointers" onClick={() => addItem(item)}>
              &#11161;
            </span>
            <span>{item.quantity}</span>
            <span className="pointers" onClick={() => removeItem(item)}>
              {' '}
              &#11163;
            </span>
          </div>
          <img className="cart-img" src={`${item.gallery[0]}`} alt="item" />
        </div>
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

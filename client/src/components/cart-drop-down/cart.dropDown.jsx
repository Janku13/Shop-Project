import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItems from '../cart-items/cart.items.component';
import './cart-dropdown.styles.css';

class CartDropDown extends Component {
  render() {
    const cartItemsList = this.props.cartItemsList;
    const currency = this.props.currency;

    const numberOfItems = cartItemsList.length;

    //making a list that contain the price for each product * by its quantity
    const listOfPrices = cartItemsList.map((item) => {
      const itemPrice =
        item.prices &&
        item.prices.filter((price) => price.currency.label === currency);
      return itemPrice[0].amount * item.quantity;
    });
    //getting total price summing all the values in listOfPrices
    const totalPrice = listOfPrices.reduce(
      (accumalator, price) => accumalator + price,
      0
    );
    //getting currencyLabel
    const priceSymbol =
      cartItemsList[0] &&
      cartItemsList[0].prices.filter(
        (price) => price.currency.label === currency
      );

    const cartItems = cartItemsList.map((item) => {
      return <CartItems key={item.id} item={item} />;
    });

    const isMany = cartItemsList.length > 1 ? 's' : '';
    return (
      <div className="cart-dropdown">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            <div className="cart-items-container">
              <div className="cart-header-text">
                <span className="my-bag-text">My Bag, </span>
                <span>
                  {numberOfItems} item{isMany}
                </span>
              </div>
              <div className="each-item-container">{cartItems}</div>
              <div className="cart-total-price">
                <span className="total">Total</span>
                <span className="total-price-number">
                  {priceSymbol[0].currency.symbol} {totalPrice}
                </span>
              </div>
            </div>
          ) : (
            <span className="empty-message">Your Cart is Empty</span>
          )}
        </div>
        <div className="checkout-button-container">
          <Link className="option" to="/checkout">
            <button className="check-out-button">VIEW BAG</button>
          </Link>
          <Link className="option" to="/checkout">
            <button className="check-out-button">CHECK OUT</button>
          </Link>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItemsList: state.cart.cartItemsList,
  currency: state.showCurrency.currency,
});

export default connect(mapStateToProps)(CartDropDown);

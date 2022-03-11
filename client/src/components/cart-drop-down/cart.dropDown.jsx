import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItems from '../cart-items/cart.items.component';
import './cart-dropdown.styles.css';

class CartDropDown extends Component {
  render() {
    const cartItemsList = this.props.cartItemsList;
    const numberOfItems = cartItemsList.length;
    const cartItems = cartItemsList.map((item) => {
      return <CartItems key={item.id} item={item} />;
    });

    return (
      <div className="cart-dropdown">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            <div className="cart-items-container">
              <span>My Bag, {numberOfItems} items</span>
              {cartItems}
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
});

export default connect(mapStateToProps)(CartDropDown);

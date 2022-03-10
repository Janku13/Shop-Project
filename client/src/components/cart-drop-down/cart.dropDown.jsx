import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItems from '../cart-items/cart.items.component';
import './cart-dropdown.styles.css';

class CartDropDown extends Component {
  render() {
    const cartItemsList = this.props.cartItemsList;
    const cartItems = cartItemsList.map((item) => {
      return <CartItems key={item.id} item={item} />;
    });

    return (
      <div className="cart-dropdown">
        <div className="cart-items">
          {cartItems.length > 0 ? (
            cartItems
          ) : (
            <span className="empty-message">Your Cart is Empty</span>
          )}
        </div>
        <Link className="option" to="/checkout">
          <button>GO TO CHECKOUT</button>
        </Link>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItemsList: state.cart.cartItemsList,
});

export default connect(mapStateToProps)(CartDropDown);

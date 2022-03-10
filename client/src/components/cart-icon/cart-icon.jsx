import React, { Component } from 'react';
import { connect } from 'react-redux';
import { toggleCartState } from '../../redux/cart/cart.action';
import cart from '../../assets/cart-icon.png';

class CartLogo extends Component {
  render() {
    const toggleCartStatus = this.props.toggleCartState;
    return (
      <div>
        <img
          className="cart-logo"
          onClick={toggleCartStatus}
          src={cart}
          alt=""
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  toggleCartState: () => dispatch(toggleCartState()),
});
export default connect(null, mapDispatchToProps)(CartLogo);

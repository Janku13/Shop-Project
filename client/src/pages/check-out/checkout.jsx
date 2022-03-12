import React, { Component } from 'react';
import { connect } from 'react-redux';
import CheckOutItem from '../../components/checkout-item/checkout-item';
import './checkout.styles.css';

class Checkout extends Component {
  render() {
    const cartItemsList = this.props.cartItemsList;
    const item = cartItemsList.map((item) => (
      <CheckOutItem key={item.id} item={item} />
    ));
    return (
      <div className="homepage">
        <div className="directory-menu ">
          <h2 className="title">CART</h2>
        </div>
        <div>{item}</div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  cartItemsList: state.cart.cartItemsList,
});
export default connect(mapStateToProps)(Checkout);

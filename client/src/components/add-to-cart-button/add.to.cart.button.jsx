import React from 'react';
import { connect } from 'react-redux';
import './add.button.style.css';
import { addItem } from '../../redux/cart/cart.action';

function AddToCartButton({ isAvailable, addItem, item }) {
  return (
    <button
      disabled={!isAvailable}
      className={`custom-button`}
      onClick={() => addItem(item)}
    >
      Add To Cart
    </button>
  );
}
const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});
export default connect(null, mapDispatchToProps)(AddToCartButton);

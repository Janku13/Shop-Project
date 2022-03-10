import React from 'react';
import './cart-item.styles.css';

export default function CartItems({ item }) {
  return (
    <div className="cart-item">
      <img className="cart-img" src={`${item.gallery[0]}`} alt="item" />
      <div className="item-details">
        <span className="name">{item.name}</span>
        <span className="price">{/* {item.quantity} x ${item.price} */}</span>
      </div>
    </div>
  );
}

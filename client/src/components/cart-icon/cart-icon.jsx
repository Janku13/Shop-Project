import React, { useState } from 'react';
import cart from '../../assets/cart-icon.png';

export default function CartLogo({ toggleCartStatus }) {
  return (
    <div>
      <img onClick={toggleCartStatus} src={cart} alt="" />
    </div>
  );
}

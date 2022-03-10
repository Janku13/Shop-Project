import CartActionTypes from './cart.types';

export const toggleCartState = () => ({
  type: CartActionTypes.TOGGLE_CART_STATE,
});

export const addItem = (item) => ({
  type: CartActionTypes.ADD_ITEM,
  payload: item,
});

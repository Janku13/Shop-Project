import CartActionTypes from './cart.types';
import { addItemToCart, removeItemFromCart } from './cart.utils';
const INITIAL_STATE = {
  showCart: false,
  cartItemsList: [],
};

export const cartReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case CartActionTypes.TOGGLE_CART_STATE:
      return {
        ...state,
        showCart: !state.showCart,
      };
    case CartActionTypes.ADD_ITEM:
      return {
        ...state,
        cartItemsList: addItemToCart(state.cartItemsList, action.payload),
      };
    case CartActionTypes.REMOVE_ITEM:
      return {
        ...state,
        cartItemsList: removeItemFromCart(state.cartItemsList, action.payload),
      };
    default:
      return state;
  }
};

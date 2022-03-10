import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../gql_query/data-query';
import ChoosePrice from '../price_drop_list/price.dropList.component';
import './header.style.css';
import CartLogo from '../cart-icon/cart-icon';
import CartDropDown from '../cart-drop-down/cart.dropDown';
import { toggleCartState } from '../../redux/cart/cart.action';

const Header = ({ toggleCartState, showCart, cartItemsList }) => {
  let navigate = useNavigate();
  const { error, loading, data } = useQuery(GET_CATEGORIES);
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) return <p>Error :(</p>;

  const option = data.categories.map((category) => {
    return (
      <p
        onClick={() => navigate(`/${category.name}`)}
        className="option"
        key={category.name}
      >
        {category.name.toUpperCase()}
      </p>
    );
  });
  return (
    <div className="header">
      <div className="options">{option} </div>
      <div className="cart-price-container">
        <ChoosePrice />
        <CartLogo toggleCartStatus={toggleCartState} />
        {showCart ? <CartDropDown cartItemsList={cartItemsList} /> : ''}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  showCart: state.cart.showCart,
  cartItemsList: state.cart.cartItemsList,
});

const mapDispatchToProps = (dispatch) => ({
  toggleCartState: () => dispatch(toggleCartState()),
});
export default connect(mapStateToProps, mapDispatchToProps)(Header);

import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../../gql_query/data-query';
import ChoosePrice from '../price_drop_list/price.dropList.component';
import CartLogo from '../cart-icon/cart-icon';
import bagLogo from '../../assets/bag-icon.png';
import CartDropDown from '../cart-drop-down/cart.dropDown';
import './header.style.css';

const Header = ({ showCart }) => {
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
    <div className=" site-header">
      <div className="options">{option} </div>
      <div>
        <img className="bag-logo" src={bagLogo} alt="" />
      </div>
      <div className="cart-price-container">
        <ChoosePrice />
        <CartLogo />
        {showCart ? <CartDropDown /> : ''}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  showCart: state.cart.showCart,
});

export default connect(mapStateToProps)(Header);

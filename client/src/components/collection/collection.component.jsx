import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import AddToCartButton from '../add-to-cart-button/add.to.cart.button';
// import CollectionItem from '../collection-item/collection-item.component';
import './collection.styles.css';

function CollectionPage({ product, currency, addToCart }) {
  const isAvailable = product.inStock;
  const navigate = useNavigate();
  const styles = {
    backgroundImage: `url(${product.gallery[0]})`,
  };
  const choosenLabel = currency;
  // 'GBP' 'USD' AUD JPY' 'RUB'
  const findingCurrency = product.prices.filter((product) => {
    return product.currency.label === choosenLabel;
  });

  return (
    <div className={`collection-item  ${!isAvailable && 'content'} `}>
      <div
        onClick={() => navigate(`/shop/${product.id}`)}
        className={` image`}
        style={styles}
      />
      {!isAvailable && (
        <div className="alert">
          <span className="out-of-stock">OUT OF STOCK</span>
        </div>
      )}
      <div className="collection-footer">
        <span className="name">{product.name}</span>
        <p className="price">
          {findingCurrency[0].currency.symbol}
          {findingCurrency[0].amount}{' '}
        </p>
      </div>
      <AddToCartButton isAvailable={isAvailable} item={product} />
    </div>
  );
}
const mapStateToProps = (state) => ({
  currency: state.showCurrency.currency,
});
export default connect(mapStateToProps)(CollectionPage);

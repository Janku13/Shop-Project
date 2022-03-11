import React, { useState } from 'react';
import { connect } from 'react-redux';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { GET_PRODUCT_DETAILS } from '../../gql_query/data-query';
import AddToCartButton from '../../components/add-to-cart-button/add.to.cart.button';
import './product.details.style.css';

function ProductDetails({ currency }) {
  const [choosenImage, setChoosenImage] = useState(0);
  const { id } = useParams();
  const { loading, error, data } = useQuery(GET_PRODUCT_DETAILS, {
    variables: { title: id },
  });
  if (loading) {
    return <p>Loading</p>;
  }
  if (error) return <p>Error :(</p>;

  const isAvailable = data.product.inStock;

  const choosenLabel = currency;
  const findingCurrency = data.product.prices.filter((product) => {
    return product.currency.label === choosenLabel;
  });

  const handleChangeImage = (e) => {
    setChoosenImage(e);
  };
  const imagesList = data.product.gallery.map((product, idx) => {
    return (
      <div
        key={idx}
        onClick={() => handleChangeImage(idx)}
        className="side-img"
      >
        <img src={product} alt="" width="100%" />
      </div>
    );
  });

  const attributes = data.product.attributes.map((product) => {
    return (
      <div key={product.id} className="attribute-container">
        <span className="product-attribute-name">{product.name}</span>
        <div className="attributes-list">
          {product.type !== 'swatch' &&
            product.items.map((item) => {
              return <span key={item.id}>{item.value}</span>;
            })}
          {product.type === 'swatch' &&
            product.items.map((item) => {
              return (
                <div key={item.id}>
                  <span style={{ color: item.value }}>{item.displayValue}</span>
                </div>
              );
            })}
        </div>
      </div>
    );
  });

  return (
    <div className="single-product">
      <div className="product-container ">
        <div className="list-of-images-container">{imagesList}</div>
        <div className="main-img-container">
          <div className={`collection-container ${!isAvailable && 'content'} `}>
            <img
              className="main-image"
              src={data.product.gallery[choosenImage]}
              alt=""
            />
            {!isAvailable && (
              <div className="alert">
                <span className="out-of-stock">OUT OF STOCK</span>
              </div>
            )}
          </div>
        </div>
        <div className="product-details-container">
          <span className="brand-name">{data.product.brand}</span>
          <p className="name">{data.product.name}</p>
          {attributes}
          <p className="price">PRICE:</p>
          <p className="price">
            {findingCurrency[0].currency.symbol}
            {findingCurrency[0].amount}
          </p>
          <div className="details-page-button-container">
            <AddToCartButton
              productDetails={true}
              isAvailable={isAvailable}
              item={data.product}
            />
          </div>

          <div
            className="description-section"
            dangerouslySetInnerHTML={{ __html: data.product.description }}
          />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currency: state.showCurrency.currency,
});
export default connect(mapStateToProps)(ProductDetails);

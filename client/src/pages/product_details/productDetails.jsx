import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { render } from 'react-dom';
import { useQuery } from '@apollo/client';
import { useParams } from 'react-router-dom';
import { Col, Container, Row, Button } from 'reactstrap';
import ImageGallery from 'react-image-gallery';
import { GET_PRODUCT_DETAILS } from '../../gql_query/data-query';
import AddToCartButton from '../../components/add-to-cart-button/add.to.cart.button';
import './product.details.style.css';

function ProductDetails({ currency, addToCart }) {
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
  const styles = {
    backgroundImage: `url(${data.product.gallery[0]})`,
  };
  const choosenLabel = currency;
  const findingCurrency = data.product.prices.filter((product) => {
    return product.currency.label === choosenLabel;
  });
  const imagesList = data.product.gallery.map((product, idx) => {
    return (
      <div
        key={product}
        onClick={() => handleChangeImage(idx)}
        className="main-row small-img-row"
      >
        <div className="img-in-row small-img-row">
          <img src={product} alt="" width="100%" />
        </div>
      </div>
    );
  });
  const handleChangeImage = (e) => {
    setChoosenImage(e);
  };
  const attributes = data.product.attributes.map((product) => {
    return (
      <div key={product.id} className="container">
        <span className="product-attribute-name">{product.name}</span>
        <div className="row">
          {product.type !== 'swatch' &&
            product.items.map((item) => {
              return (
                <div className="col-2">
                  <span>{item.value}</span>
                </div>
              );
            })}
          {product.type === 'swatch' &&
            product.items.map((item) => {
              return (
                <div className="col-2">
                  <span style={{ color: item.value }}>{item.displayValue}</span>
                </div>
              );
            })}
        </div>
      </div>
    );
  });

  return (
    <div className="small-container single-product">
      <div className="row">
        <div className=" colum col-2">{imagesList}</div>
        <div className="colum col-6 ">
          <div className={`collection-container ${!isAvailable && 'content'} `}>
            <img
              className="image"
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
        <div className=" colum col-4">
          <span className="name">{data.product.brand}</span>
          <p className="name">{data.product.name}</p>
          {attributes}
          <p className="price">
            {findingCurrency[0].currency.symbol}
            {findingCurrency[0].amount}
          </p>
          <div dangerouslySetInnerHTML={{ __html: data.product.description }} />
          <AddToCartButton isAvailable={isAvailable} item={data.product} />
        </div>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  currency: state.showCurrency.currency,
});
export default connect(mapStateToProps)(ProductDetails);

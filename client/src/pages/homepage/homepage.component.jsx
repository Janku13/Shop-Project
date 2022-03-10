import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { ALL_SHOP_DATA } from '../../gql_query/data-query';
import CollectionPage from '../../components/collection/collection.component';
import './homepage.style.css';

export default function HomePage({ addToCart }) {
  const { category } = useParams();
  const isTitle = category ? category : 'all';

  const { loading, error, data } = useQuery(ALL_SHOP_DATA, {
    variables: { title: isTitle },
  });

  if (loading) {
    return <p>Loading</p>;
  }
  if (error) return <p>Error :(</p>;

  const titleName = data.category.name;
  const myCategory = titleName
    ? titleName.charAt(0).toUpperCase() + titleName.slice(1)
    : 'Please Insert A valid Param';
  const products = data.category.products;
  const product = products.map((item) => (
    <CollectionPage key={item.id} product={item} addToCart={addToCart} />
  ));

  return (
    <div className="homepage">
      <div className="directory-menu ">
        <h2 className="title">{myCategory}</h2>
      </div>
      <div className="items">{product}</div>
    </div>
  );
}

// huarache - x - stussy - le;
// jacket - canada - goosee;

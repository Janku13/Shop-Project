import { gql } from '@apollo/client';

export const ALL_SHOP_DATA = gql`
  query Query($title: String!) {
    category(input: { title: $title }) {
      name
      products {
        id
        name
        inStock
        gallery
        prices {
          amount
          currency {
            symbol
            label
          }
        }
      }
    }
  }
`;
export const GET_CATEGORIES = gql`
  {
    categories {
      name
    }
  }
`;

export const GET_CURRENCIES = gql`
  {
    currencies {
      label
      symbol
    }
  }
`;

export const GET_PRODUCT_DETAILS = gql`
  query Query($title: String!) {
    product(id: $title) {
      id
      name
      gallery
      inStock
      brand
      prices {
        amount
        currency {
          symbol
          label
        }
      }
      description
      attributes {
        id
        name
        type
        items {
          displayValue
          value
          id
        }
      }
    }
  }
`;

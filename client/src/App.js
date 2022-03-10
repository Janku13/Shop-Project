import React, { Component } from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/header/header.component';
import HomePage from './pages/homepage/homepage.component';
import ProductDetails from './pages/product_details/productDetails';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/:category" element={<HomePage />} />
          <Route path="/shop/:id" element={<ProductDetails />} />
        </Routes>
      </div>
    );
  }
}

export default App;

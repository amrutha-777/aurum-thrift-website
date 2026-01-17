import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Container, Box } from '@mui/material';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import AurumThrift from './pages/sections/AurumThrift';
import AurumStories from './pages/sections/AurumStories';
import AurumReDesign from './pages/sections/AurumReDesign';
import AurumVault from './pages/sections/AurumVault';
import AurumLoop from './pages/sections/AurumLoop';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import DesignerForum from './pages/DesignerForum';
import DesignerProfile from './pages/DesignerProfile';
import SellerProfile from './pages/SellerProfile';
import UserProfile from './pages/UserProfile';
import UserAuth from './pages/UserAuth';
import './App.css';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [user, setUser] = useState(null);

  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  const removeFromCart = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <Router>
      <Box className="app-container">
        <Navbar user={user} cartItems={cartItems} />
        <Container maxWidth="lg" className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/thrift" element={<AurumThrift addToCart={addToCart} />} />
            <Route path="/stories" element={<AurumStories />} />
            <Route path="/redesign" element={<AurumReDesign />} />
            <Route path="/vault" element={<AurumVault addToCart={addToCart} />} />
            <Route path="/loop" element={<AurumLoop />} />
            <Route path="/product/:id" element={<ProductDetail addToCart={addToCart} />} />
            <Route path="/cart" element={<Cart cartItems={cartItems} removeFromCart={removeFromCart} />} />
            <Route path="/checkout" element={<Checkout cartItems={cartItems} />} />
            <Route path="/designer-forum" element={<DesignerForum user={user} />} />
            <Route path="/designer/:designerId" element={<DesignerProfile />} />
            <Route path="/seller/:sellerId" element={<SellerProfile />} />
            <Route path="/user/:userId" element={<UserProfile />} />
            <Route path="/auth" element={<UserAuth setUser={setUser} />} />
          </Routes>
        </Container>
        <Footer />
      </Box>
    </Router>
  );
}

export default App;

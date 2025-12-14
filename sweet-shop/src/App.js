import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Navbar from './components/Navbar';
import SweetShopHome from './components/SweetShopHome';
import Product from './components/Product';
import Purchase from './components/Purchase';

import Signup from './pages/Signup';
import Login from './pages/Login';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check session storage on load to restore user session if active
    const storedUser = sessionStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  return (
    <>
      {/* Global Navbar */}
      <Navbar user={user} setUser={setUser} />

      {/* App Routes */}
      <Routes>
        <Route path="/" element={<Navigate to="/home" replace />} />
        <Route path="/home" element={<SweetShopHome />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/products" element={<Product />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="*" element={<div className="text-gray-600 p-6">Not Found</div>} />
      </Routes>
    </>
  );
}

export default App;

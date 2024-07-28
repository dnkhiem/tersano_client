import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import ProductList from './components/ProductList';
import AddProductModal from './components/AddProductModal';

const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [username, setUsername] = useState<string | null>(localStorage.getItem('username'));
  const [showLogin, setShowLogin] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
    } else {
      localStorage.removeItem('token');
    }
  }, [token]);

  useEffect(() => {
    if (username) {
      localStorage.setItem('username', username);
    } else {
      localStorage.removeItem('username');
    }
  }, [username]);

  const handleLogout = () => {
    setToken(null);
    setUsername(null);
  };

  const handleAddProduct = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const onProductAdded = () => {
    setRefreshKey(prevKey => prevKey + 1); // Increment key to refresh product list
  };

  if (!token) {
    return (
      <div>
        {showLogin ? (
          <div>
            <Login setToken={setToken} setUsername={setUsername} setShowLogin={setShowLogin} />
          </div>
        ) : (
          <div>
            <Register setShowLogin={setShowLogin} />
          </div>
        )}
      </div>
    );
  }

  return (
    <div style={{ textAlign: 'center', position: 'relative' }}>
      <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', alignItems: 'center' }}>
        <span style={{ marginRight: '10px', fontSize: '16px' }}>Welcome, {username}</span>
        <button
          onClick={handleLogout}
          style={{
            padding: '10px 20px',
            fontSize: '16px'
          }}
        >
          Logout
        </button>
      </div>
      <button
        onClick={handleAddProduct}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px'
        }}
      >
        Add Product
      </button>
      <AddProductModal isOpen={isModalOpen} onRequestClose={closeModal} token={token} onAdd={onProductAdded} />
      <ProductList token={token} key={refreshKey} />
    </div>
  );
};

export default App;

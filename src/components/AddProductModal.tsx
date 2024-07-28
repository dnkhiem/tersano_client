import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface AddProductModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
  token: string;
  onAdd: () => void;
}

const AddProductModal: React.FC<AddProductModalProps> = ({ isOpen, onRequestClose, token, onAdd }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        `${API_BASE_URL}/products`,
        { name, price: parseFloat(price), description },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onAdd();
      setName('');
      setPrice('');
      setDescription('');
      onRequestClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} contentLabel="Add Product" ariaHideApp={false}>
      <div style={{ width: '400px', margin: '0 auto' }}>
        <h2>Add Product</h2>
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <label>Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              style={{ display: 'block', width: '100%', marginBottom: '20px', padding: '8px' }}
            />
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Price</label>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                style={{ display: 'block', width: 'calc(100% - 20px)', padding: '8px' }}
              />
              <span style={{ marginLeft: '5px' }}>$</span>
            </div>
          </div>
          <div style={{ marginBottom: '20px' }}>
            <label>Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              style={{ display: 'block', width: '100%', height: '60px', marginBottom: '20px', padding: '8px' }}
            />
          </div>
          <button type="submit" style={{ display: 'block', width: '100%', margin: '0 auto', padding: '6px 0', fontSize: '16px' }}>Add Product</button>
        </form>
      </div>
    </Modal>
  );
};

export default AddProductModal;

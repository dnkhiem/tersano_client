import React, { useState } from 'react';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Props {
  token: string;
  onAdd: () => void;
}

const AddProduct: React.FC<Props> = ({ token, onAdd }) => {
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
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="number"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        required
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <input
        type="text"
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
        style={{ display: 'block', width: '100%', marginBottom: '10px', padding: '8px' }}
      />
      <button type="submit" style={{ display: 'block', width: '50%', margin: '0 auto', padding: '6px 0', fontSize: '16px' }}>Add Product</button>
    </form>
  );
};

export default AddProduct;

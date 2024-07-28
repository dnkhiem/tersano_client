import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UpdateProductModal from './UpdateProductModal';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
  insertedAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

interface ProductListProps {
  token: string;
}

const ProductList: React.FC<ProductListProps> = ({ token }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/products`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchProducts();
  }, [token]);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (confirmDelete) {
      try {
        await axios.delete(`${API_BASE_URL}/products/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setProducts(products.filter(product => product.id !== id));
      } catch (err) {
        console.error(err);
      }
    }
  };

  const handleUpdate = (product: Product) => {
    setCurrentProduct(product);
    setIsUpdateModalOpen(true);
  };

  const closeUpdateModal = () => {
    setIsUpdateModalOpen(false);
    setCurrentProduct(null);
  };

  const onProductUpdated = (updatedProduct: Product) => {
    setProducts(products.map(product => product.id === updatedProduct.id ? updatedProduct : product));
    closeUpdateModal();
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ fontSize: '2em' }}>Products List</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
        {products.map(product => (
          <div key={product.id} style={{ border: '1px solid #ccc', borderRadius: '8px', padding: '20px', textAlign: 'left' }}>
            <h3 style={{ fontSize: '2em' }}>{product.name}</h3>
            <p><strong>Price:</strong> ${product.price}</p>
            <p><strong>Description:</strong> {product.description}</p>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <button onClick={() => handleUpdate(product)} style={{ padding: '10px 20px', fontSize: '14px' }}>Update</button>
              <button onClick={() => handleDelete(product.id)} style={{ padding: '10px 20px', fontSize: '14px' }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      {currentProduct && (
        <UpdateProductModal
          isOpen={isUpdateModalOpen}
          onRequestClose={closeUpdateModal}
          token={token}
          product={currentProduct}
          onUpdate={onProductUpdated}
        />
      )}
    </div>
  );
};

export default ProductList;

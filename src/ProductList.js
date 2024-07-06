import React from 'react';
import './productPage.css'
import { useState } from 'react';
const ProductList = ({ products, onDelete, onEdit }) => {
  const [editProductId, setEditProductId] = useState(null);
  const [editFormData, setEditFormData] = useState({
    title: '',
    price: '',
    description: ''
  });

  const handleEditClick = (product) => {
    setEditProductId(product.id);
    setEditFormData({
      title: product.title,
      price: product.price,
      description: product.description
    });
  };

  const handleCancelClick = () => {
    setEditProductId(null);
  };

  const handleFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData({ ...editFormData, [name]: value });
  };

  const handleEditFormSubmit = (event) => {
    event.preventDefault();
    onEdit(editProductId, {
      ...products.find(product => product.id === editProductId),
      ...editFormData
    });
    setEditProductId(null);
  };

  return (
    <ul className='productListUl'>
      {products.map((product) => (
        <li key={product.id} className='listEle'>
          {editProductId === product.id ? (
            <form onSubmit={handleEditFormSubmit}>
              <input 
                type="text"
                name="title"
                value={editFormData.title}
                onChange={handleFormChange}
                className='editInput'
              />
              <input 
                type="text"
                name="price"
                value={editFormData.price}
                onChange={handleFormChange}
                className='editInput'
              />
              <input 
                type="text"
                name="description"
                value={editFormData.description}
                onChange={handleFormChange}
                className='editInput'
              />
              <button type="submit" className='saveButton'>Save</button>
              <button type="button" onClick={handleCancelClick} className='cancelButton'>Cancel</button>
            </form>
          ) : (
            <>
              {product.id}. {product.title} price: ${product.price}<br/>
              {product.description}<br/>
              <button onClick={() => handleEditClick(product)} className='editButton'>Edit</button>
              <button onClick={() => onDelete(product.id)} className='deleteButton'>Delete</button>
            </>
          )}
        </li>
      ))}
    </ul>
  );
};

export default ProductList;

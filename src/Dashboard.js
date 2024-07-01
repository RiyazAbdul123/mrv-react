import React, { useState } from 'react';
import ProductList from './ProductList';
import './productPage.css'
const products = [
  { id: 1, name: 'Product A' },
  { id: 2, name: 'Product B' },
  { id: 3, name: 'Product C' },
  { id: 4, name: 'Product D' },
  { id: 5, name: 'Product E' },
];

const Dashboard = () => {
  console.log("Dashboard Component called 1 --- ")
 
  const [searchTerm, setSearchTerm] = useState('');
  const handleFilter = (event) => {
    setSearchTerm(event.target.value);
  };
  const filteredProducts=products.filter((product) => (product.name.toLowerCase().includes(searchTerm.toLowerCase())));

  return (
    <div className='appStyle'>
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={handleFilter}
        className='searchBox'
      />
      <ProductList 
       products={filteredProducts} 
      />
    </div>
  );
};

export default Dashboard;
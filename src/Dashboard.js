import React, { useState ,useEffect} from 'react';
import ProductList from './ProductList';
import './productPage.css'
// const products = [
//   { id: "1", name: 'Product A' },
//   { id: "2", name: 'Product B' },
//   { id: "3", name: 'Product C' },
//   { id: "4", name: 'Product D' },
//   { id: "5", name: 'Product E' },
// ];

const Dashboard = () => {
  console.log("Dashboard Component called 1 --- ")
  const [productList,setProductList]=useState([])
  const [searchTerm, setSearchTerm] = useState('');
  const [selectItem,setSelectItem]=useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [newProduct, setNewProduct] = useState({ title: '', price: '', description: '' });
  const handleFilter = (event) => {
    setSearchTerm(event.target.value);
  };
  const handleSelectSearchBy=(event)=>{
    setSelectItem(event.target.value);
  }
  const handleDeleteProduct = (productId) => {
    setProductList(productList.filter(product => product.id !== productId));
  };

  const handleEditProduct = (productId, updatedProduct) => {
    setProductList(productList.map(product => 
      product.id === productId ? updatedProduct : product
    ));
  };

  const handleNewProductChange = (event) => {
    const { name, value } = event.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleAddProduct = (event) => {
    event.preventDefault();
    const newProductWithId = {
      ...newProduct,
      id: (productList.length + 1).toString(),
    };
    setProductList([...productList, newProductWithId]);
    setNewProduct({ title: '', price: '', description: '' });
  };

    const filteredProducts=productList.filter((product) => {
      if(selectItem==="getByName"){
        return (product.title.toLowerCase().includes(searchTerm.toLowerCase()))
      }
      else if(selectItem==="getById"){
        return (product.id.toString().includes(searchTerm))
      }
      else if(selectItem==="getByPrice"){
        return (product.price.toString().includes(searchTerm))
      }
      else{
        return productList;
      }
    });

  
    
    useEffect(() => {
      const fetchData = () => {
        const fetchPromise = fetch('https://dummyjson.com/products');
  
        const Response = fetchPromise.then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        });
  
        Response
          .then(data => {
            console.log(data);
            console.log(data.products)
            setProductList(data.products);
            setLoading(false);
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
          });
      };
  
      fetchData();
    }, []);
  
    if (loading) {
      return <div>Loading...</div>;
    }
  
    if (error) {
      return <div>Error: {error}</div>;
    }
  

  

  return (
    <div className='appStyle'>
      <div className='search-card'>
        <label>Search Products: </label>
        <input
         type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleFilter}
          className='searchBox'
        />
        <label> Get Products By: </label>
        <select  id="selectBy" onChange={handleSelectSearchBy} className='optSelectBox'>
          <option value="getById">get product by id</option>
          <option value="getByName">get product by name</option>
          <option value="getByPrice">get product by price</option>
        </select>
      </div>
      <div className='add-product-card'>
        <h2>Add New Product</h2>
        <form onSubmit={handleAddProduct} className='addProductForm'>
          <input
            type="text"
            name="title"
            value={newProduct.title}
            onChange={handleNewProductChange}
            placeholder="Product Title"
            className='inputField'
            required
          />
          <input
            type="text"
            name="price"
            value={newProduct.price}
            onChange={handleNewProductChange}
            placeholder="Product Price"
            className='inputField'
            required
          />
          <input
            type="text"
            name="description"
            value={newProduct.description}
            onChange={handleNewProductChange}
            placeholder="Product Description"
            className='inputField'
            required
          />
          <button type="submit" className='addButton'>Add Product</button>
        </form>
      </div>
      

      
      <ProductList 
        products={filteredProducts} 
        onDelete={handleDeleteProduct} 
        onEdit={handleEditProduct} 
      />
    </div>
  );
};

export default Dashboard;
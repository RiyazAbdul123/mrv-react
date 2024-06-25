import React from 'react';
import './productPage.css';
const ProductDetails=(props)=>{
    return(
        <ul className='divCard'>
            <li className='title'>{props.Details.name}</li>
            <li>₹.{props.Details.Price}</li>
            <li className='descript'>{props.Details.Description}</li>
        </ul>
            
    );
}
export default ProductDetails;
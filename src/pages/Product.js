import React, {useState} from "react";
import { getProduct, getProducts } from "../api/apiProduct";
import { DisplayBoard } from '../components/DisplayBoard'

const Product = async () => {
  
    const [query, setQuery] = useState('');
    const [prod, setProduct] = useState([]);
    const [noOfprod, setNoOfProduct] = useState(0);
    
    const fetchAllProducts = () => {
      getProducts()
        .then(prod => {
          console.log(prod);
          setProduct(prod);
          setNoOfProduct(prod.length);
        });
    }

    console.log(prod);
    
    return (
      <>
        <h1>Products</h1>
        <DisplayBoard
                    numberOfProducts={noOfprod}
                    getAllProducts={fetchAllProducts}
                  >
        </DisplayBoard>
      </>
      );
  };
  
export default Product;
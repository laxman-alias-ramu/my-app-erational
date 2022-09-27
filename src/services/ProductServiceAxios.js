import axios from "axios";

export async function getAllProducts() {
    console.log("getAllProducts using axios");
    try{
        //const response = await fetch('http://localhost:3322/api/products');
        const response = await axios.get('http://localhost:3322/api/products');
        console.log(response.data);
        //return (response);
        return response.data;
    }catch(error) {
        return [];
    }
}

export async function createProduct(data) {
  console.log("createProduct using axios");
  console.log("data");
  console.log(data);
  const response = await fetch('http://localhost:3322/api/product', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(data)
      })
    return await response.json();
}
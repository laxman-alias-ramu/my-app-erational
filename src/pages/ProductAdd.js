const ProductAdd = () => {
    return (
      <>
        <h1>Add Products</h1>
          <form>
          <table>
            <tr><td><h4>Product Name</h4></td></tr>  
            <tr><td><input type="text" name="txtName" placeholder="Product Name"></input></td></tr>  
            
            
            <tr><td><h4>Product Rate</h4></td></tr>  
            <tr><td><input type="text" name="txtRate" placeholder="Product Rate"></input></td></tr>  

            <tr><td><h4>Product Image</h4></td></tr>
            <tr><td><input type="text" name="txtImage" placeholder="Product Image"></input></td></tr>  

            <tr><td><input type="submit"></input></td></tr>  
            
          </table>
          </form>
      </>
    );
  };
  
export default ProductAdd;

export async function getAllProducts() {

    try{
        const response = await fetch('/api/products', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                mode : 'no-cors'
            },
            
            body: JSON.stringify({product: data})
          });
        return await response.json();
    }catch(error) {
        return [];
    }
    
}

export async function createProduct(data) {
    const response = await fetch(`/api/product`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            mode : 'no-cors'
        },
        
        body: JSON.stringify({product: data})
      })
    return await response.json();
}
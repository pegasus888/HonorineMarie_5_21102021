fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(products => console.log(products));

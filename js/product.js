let params = (new URL(document.location)).searchParams;
let id = params.get('id'); // is the string "Jonathan Smith".
console.log(id);

// Get info for a single product
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(products => {


    console.log(products)
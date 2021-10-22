// Get the product's id from the URL
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);


// Get a single product by id from the API
fetch('http://localhost:3000/api/products/' +id)
    .then(response => response.json())
    .then(products => {


console.log(products);


// Display a single product on HTML
    let result = '';
products.forEach(product => {
    result += `
            <img src=${product.imageUrl} alt=${product.altTxt}>
            <h1 id=${product.name}</h1>
            <p>Prix : <span id=${product.price}</span>€</p>
            <p id=${product.description}</p>
            <option value=${product.colors}</option>
            `
})
console.log(result);
document.getElementsByClassName("item__img").innerHTML=result;
document.getElementsById("title").innerHTML=result;
document.getElementsById("price").innerHTML=result;
document.getElementsById("description").innerHTML=result;
document.getElementsById("colors").innerHTML=result;
})
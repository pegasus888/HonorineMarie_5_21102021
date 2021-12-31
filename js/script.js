
// Get all products from the API
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(products => {


// Display all products on Home page
let result = '';
products.forEach(product => {
    // console.log(product);
    result += `
    <a href="product.html?id=${product._id}">
        <article>
            <img src=${product.imageUrl} alt="${product.altTxt}">
            <h3 class="productName">${product.name}</h3>
            <p class="productDescription">${product.description}</p>
        </article>
    </a>
    `
})
document.getElementById("items").innerHTML=result;
});
function getProducts() {
    fetch("http://localhost:3000/api/products")
        .then(response => response.json())
        .then(data => console.log(data));
}
getProducts();


// Variables
const products = document.getElementsByTagName("a");
console.log(products);


// Getting the products
/*class Products {
    async getProducts () {
        let result = await fetch("http://localhost:3000/api/products");
        let products = await result.json();
        return products;
    }
} */

// Display products
class UI {
    displayProducts(products){
let result = '';
products.forEach(product => {
    result += `
    <a href=§{product._id}>
        <article>
            <img src=§{product.imageUrl} alt=§{product.altTxt}>
            <h3 class=§{product.name}</h3>
            <p class=§{product.description}</p>
        </article>
    </a>
    `
})

    }
}

// Get all products
products.getProducts().then(products => UI.displayProducts(products));
const products = document.getElementsByClassName("item");
const productsDetails = document.getElementsByTagName("article");

const productImage = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");


// Products added to Local storage
class Storage {
    static saveProducts(products){
        localStorage.setItem("products",JSON.stringify(products));
    }
}

Storage.saveProducts(products);


// Get the product's id from the URL
let params = (new URL(document.location)).searchParams;
let id = params.get('id');


// Get a single product by id from the API
fetch(`http://localhost:3000/api/products/${id}`)
    .then(response => response.json())
    .then(productsDetails => {
        productImage.innerHTML = `<img src=${productsDetails.imageUrl}>`
        productTitle.textContent = `${productsDetails.name}`
        productPrice.textContent = `${productsDetails.price}`
        productDescription.textContent = `${productsDetails.description}`
        productColor.innerHTML = productsDetails.colors
            .map((a) => `<option>${a}</option>`)

                    })
    console.log(productsDetails);

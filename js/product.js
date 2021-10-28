const products = document.getElementsByClassName("item");
const productsDetails = document.getElementsByTagName("article");

const productImage = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");

let couchesDOM = [];

// Add Products to Local storage
class Storage {
    static saveProducts(products) {
        localStorage.setItem("products", JSON.stringify(products));
    }
    static getProduct(id) {
        let products = JSON.parse(localStorage.getItem("products"));
        return products.find(product => product.id === id);
    }
    static saveCart(cart) {
        localStorage.setItem("cart", JSON.stringify(cart));
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

  //  .then(() => {
   //     getCouch();
   // }

// Add products to the cart
/*
    getCouch() {
        const couches = [...document.querySelectorAll(".item")];
        couchesDOM = couches;
        couches.forEach(couch => {
            let id = couch.dataset.id;
            let inCart = cart.find(item => item.id === id);
            if(inCart){
                couch.innerText = "Ajouté";
                couch.disabled = true;
            }
                couch.addEventListener("click", event => {
                    event.target.innerText = "Ajouté";
                    event.taget.disabled = true;
                    // Get product from products
                    let cartItem = {...Storage.getProduct(id), amount:1};
                });
            }
    } */
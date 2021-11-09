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


const productsDOM = document.querySelector(".items");
// Display all products on index.html
let result = '';
products.forEach(product => {
    result += `
    <a href="product.html?id=${product._id}">
        <article>
            <img src=${product.imageUrl} alt=${product.altTxt}>
            <h3 class=${product.name}</h3>
            <p class=${product.description}</p>
        </article>
    </a>
    `
})
document.getElementById("items").innerHTML=result;
});

// storage
static saveProducts(products) {
    localStorage.setItem("products", JSON.stringify(products));
}

/* 1 Add products to the cart
    2 Save cart in local storage
    3 set cart values
    4 display cart items
    */

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
    } ************************************************************/

    // products.js
    const products = document.getElementsByClassName("item");
const productsDetails = document.getElementsByTagName("article");

const productImage = document.querySelector(".item__img");
const productTitle = document.getElementById("title");
const productPrice = document.getElementById("price");
const productDescription = document.getElementById("description");
const productColor = document.getElementById("colors");

const productQuantity = document.getElementById("quantity");

const btnAddToCart = document.getElementById("addToCart");

//Storage
let cart = JSON.parse(localStorage.getItem("Couches")) || [];


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
            // accumulator: total of all calculations, item: current value => reduce to a single value
            .reduce((acc, item) => acc + item);
            productQuantity.setAttribute("value", 1);


        btnAddToCart.addEventListener("click", (e) => {
            class Couch {
                constructor(id, color, quantity) {
                    this.id = id;
                    this.color = color;
                    this.quantity = +quantity;
                }
            }

        let newProduct = new Couch(
            id,
            productColor.value,
            productQuantity.value
        );

        let indexProduct;

        // if color already in cart
        for (product of cart) {
            console.log(product.color, product.id);
            if (product.color == newProduct.color && product.id == newProduct.id) {
                productIndex = cart.indexOf(product);
            }
        }

        // if color already in cart => modify quantity
        if (productIndex == null) {
            cart.push(newProduct);
        }
        else {
            cart[productIndex].quantity =
            cart[productIndex].quantity + newProduct.quantity;
        }
        localStorage.setItem("Couches", JSON.stringify(cart));
                });
    });

    // end products.js **********************************************

    // cart.js
    const cartDOM = document.querySelector(".cart");
const cartItems = document.getElementById("cart__items");
const cartTotal = document.querySelector(".cart__price");
const cartContent = document.querySelector(".cart__item__content");


let cart = [];

// Add product to the cart
cart = [...cart, cartItem];

// Save cart in Local storage
Storage.saveCart(cart);


// Set cart values
this.setCartValues(cart);

setCartValues(cart) {
    let tempTotal = 0;
    let itemsTotal = 0;
    cart.map(item =>{
        tempTotal += item.price = item.amount;
    })
    cartTotal.innerText = parseFloat(tempTotal.toFixed(2));
    cartItems.innerText = itemsTotal;
}


// Display cart item
this.addCartItem(cartItem);

// Add to the DOM
addCartItem(item) {
const div = document.createElement('div');
div.classList.add('cart__items');
div.innerHTML = `
    <article class="cart__item" data-id="{product-ID}">
    <div class="cart__item__img">
    <img src=${item.imageUrl} alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
    <div class="cart__item__content__titlePrice">
        <h2>${item.name}</h2>
        <p>${item.price} €</p>
    </div>
    <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity" data-id=${item._id}>
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min=${item.amount} max="100" value="42">
        </div>
        <div class="cart__item__content__settings__delete" data-id=${item._id}>
        <p class="deleteItem">Supprimer</p>
        </div>
    </div>
    </div>
    </article>
    `;
    cartContent.appendChild(div);
}

// end of cart.js ******************************************

// products.js add to cart ********************************
// Single product: Add to cart
const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", () => {
	const itemId = idCheck();
	const itemColor = document.getElementById("colors").value;
	const itemQuantity = document.getElementById("quantity").value;

        // Color confirmation, Quantity confirmation != 0
        if (itemColor === "") {
            alert("Choisir une couleur");
        } else if (itemQuantity == 0) {
            alert("Ajouter un article");
        } else {

            // Single Product: Save in localStorage (Just a single one not all products !!!)
            const itemInCart = [itemId, itemColor];
            localStorage.setItem(itemInCart, itemQuantity);
            window.location.href = "./cart.html";
        }
});
// end of products.js *************************************
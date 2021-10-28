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

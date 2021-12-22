/* Cart Page */

// Single product: Get Id from Local Storage
async function getDetailsItemId(kanap) {
	try {
		let response = await fetch(`http://localhost:3000/api/products/${kanap.itemId}`);
		return await response.json();
	} catch (error) {
		console.log("Error : " + error);
	}
}


// Cart: check if empty
function emptyCart() {
	if (localStorage.length == 0) {
		document.getElementById("cart__items").innerHTML = "<p >Aucun article, visitez <a href='./index.html' style=' color:white; font-weight:700'>notre séléction</a>.</p>";
	}
}


// Display on cart.html
(async function displayEachItem() {
	let displayHtml = "";
	const itemContainer = document.getElementById("cart__items");

	// Cart: check if empty
	emptyCart();
	let cart = JSON.parse(localStorage.getItem("cart"));

	// Else
	for (let i = 0; i < cart.length; i++) {
		let item = await getDetailsItemId(cart[i]);
		let htmlContent = `
		<article class="cart__item" data-id="${item._id}" data-color="${cart[i].itemColor}" data-price="${item.price}">
			<div class="cart__item__img">
				<img src="${item.imageUrl}" alt="${item.altTxt}">
			</div>
			<div class="cart__item__content">
				<div class="cart__item__content__titlePrice">
					<h2>${item.name}</h2>
					<p>${item.price} €</p>
					<p>Coloris : ${cart[i].itemColor}</p>
				</div>
				<div class="cart__item__content__settings">
					<div class="cart__item__content__settings__quantity">
						<p>Qté : </p>
						<input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${cart[i].itemQuantity}">
					</div>
					<div class="cart__item__content__settings__delete">
						<p class="deleteItem">Supprimer</p>
					</div>
				</div>
			</div>
		</article>
		`;
		displayHtml += htmlContent;
	}
	itemContainer.innerHTML += displayHtml;

    // Single product: delete
	deleteItem();
	// Single product: quantity
	// itemQuantityUpdate();
	// All products in cart: total
	totalItemInCartUpdate();
	// All products in cart: total price
	totalPriceUpdate();
})();



/* Cart: Items Data */

// Cart: total price
function totalPriceUpdate() {
	let quantitySelector = document.querySelectorAll(".itemQuantity");
	let totalCartPrice = 0;
	for (let i = 0; i < quantitySelector.length; i++) {
		let articleDOM = quantitySelector[i].closest("article");
		let individualPrice = articleDOM.dataset.price;
		totalCartPrice += parseInt(quantitySelector[i].value) * individualPrice;
	}
	let totalPriceDisplay = document.getElementById("totalPrice");
	totalPriceDisplay.innerHTML = totalCartPrice;
}


// Cart: Items: quantity
function totalItemInCartUpdate() {
	let quantitySelector = document.querySelectorAll(".itemQuantity");
	let itemAmount = 0;
	for (let i = 0; i < quantitySelector.length; i++) {
		itemAmount += parseInt(quantitySelector[i].value);
	}
	const totalQuantityDisplay = document.getElementById("totalQuantity");
	totalQuantityDisplay.innerHTML = itemAmount;

	// Update total price => New total price
	totalPriceUpdate();
	// Cart: check if empty
	emptyCart();
}


// Cart: Items: delete
let productLocalStorage = JSON.parse(localStorage.getItem("cart"));

			// Récupérer le panier

				function getTotals() {
				// les quantités: récupération
				let itemQuant = document.getElementsByClassName('itemQuantity');
				let itemQuantLength = itemQuant.length,
				totalQuantity = 0;

				for (var i = 0; i < itemQuantLength; ++i) {
					totalQuantity += itemQuant[i].valueAsNumber;
				}

				let productTotalQuantity = document.getElementById('totalQuantity');
				productTotalQuantity.innerHTML = totalQuantity;
				console.log(totalQuantity);

				// le prix: récupération
				totalPrice = 0;

				for (var i = 0; i < itemQuantLength; ++i) {
					totalPrice += (itemQuant[i].valueAsNumber * productLocalStorage[i].productPrice);
				}

				let productTotalPrice = document.getElementById('totalPrice');
				productTotalPrice.innerHTML = totalPrice;
				console.log(totalPrice);
				}
				getTotals();


			// trouver même produit: même id + même color
				let deleteItemBtns = document.querySelectorAll(".deleteItem");
				for (let i = 0; i < deleteItemBtns.length; i++) {

				let deleteItemId = productLocalStorage[i].itemId;
				let deleteItemColor = productLocalStorage[i].itemColor;

				productLocalStorage = productLocalStorage.filter(el => el.itemId !== deleteItemId || el.itemColor !== deleteItemColor);

				localStorage.setItem("cart", JSON.stringify(productLocalStorage));
				}

			// réduire de 1 qté
				function modifyItemQuant() {
					let itemQuantModify = document.querySelectorAll(".itemQuantity");

					for (let n = 0; n < itemQuantModify.length; n++){
						itemQuantModify[n].addEventListener("change" , (event) => {
							event.preventDefault();

							// Sélection: Element à modifier en fonction de id & color
							let quantityModif = productLocalStorage[n].productQuantity;
							let itemQuantModifyValue = itemQuantModify[n].valueAsNumber;

							const lastResult = productLocalStorage.last((el) => el.itemQuantModifyValue !== quantityModif);

							lastResult.productQuantity = itemQuantModifyValue;
							productLocalStorage[n].productQuantity = lastResult.productQuantity;

							localStorage.setItem("cart", JSON.stringify(productLocalStorage));

							// Update
							location.reload();
						})
					}
				}
				modifyItemQuant();


			// if qte 0 delete ligne panier
				function deleteItem() {
					let productLocalStorage = JSON.parse(localStorage.getItem("cart"));
					let deleteItemBtns = document.querySelectorAll(".deleteItem");
					for (let i = 0; i < deleteItemBtns.length; i++) {
						deleteItemBtns[i].addEventListener("click", (event) => {
							event.preventDefault();
							console.log ("click");


								// Sélection: Element à modifier en fonction de id & color

								let itemIdDelete = productLocalStorage[i].itemId;
								let itemColorDelete = productLocalStorage[i].itemColor;

								productLocalStorage = productLocalStorage.filter( el => el.itemId !== itemIdDelete || el.itemColor !== itemColorDelete);


					// Remettre en storage le panier
						localStorage.setItem("cart", JSON.stringify(productLocalStorage));

					// Rafraichir
					location.reload();
							});
						}
				}
					deleteItem();



/* Cart: User Data: REGEX */

// User: input
class Form {
	constructor() {
		this.firstName = document.getElementById("firstName").value;
		this.lastName = document.getElementById("lastName").value;
		this.adress = document.getElementById("address").value;
		this.city = document.getElementById("city").value;
		this.email = document.getElementById("email").value;
	}
}


// User: input: Regex
function userInputCheck() {
	const userForm = new Form();
	// Firstname
	function validFirstName() {
		const userFirstName = userForm.firstName;
		const firstNameErrorMsg = document.getElementById("firstNameErrorMsg");
		if (/^([A-Za-z]{3,20})?([-]{0,1})?([A-Za-z]{3,20})$/.test(userFirstName)) {
			firstNameErrorMsg.innerText = "";
			return true;
		} else {
			firstNameErrorMsg.innerText = "Prénom invalide, 3 à 20 caractères";
		}
	}
	// Lastname
	function validLastName() {
		const userLastName = userForm.lastName;
		const lastNameErrorMsg = document.getElementById("lastNameErrorMsg");
		if (/^[A-Za-z]{2,20}$/.test(userLastName)) {
			lastNameErrorMsg.innerText = "";
			return true;
		} else {
			lastNameErrorMsg.innerText = "Nom invalide, 2 à 20 caractères";
		}
	}
	// Address
	function validAddress() {
		const userAddress = userForm.address;
		const addressErrorMsg = document.getElementById("addressErrorMsg");
		if (/[^§]{5,50}$/.test(userAddress)) {
			addressErrorMsg.innerText = "";
			return true;
		} else {
			addressErrorMsg.innerText = "Adresse invalide";
		}
	}
	// City
	function validCity() {
		const userCity = userForm.city;
		const cityErrorMsg = document.getElementById("cityErrorMsg");
		if (/^[A-Za-z]{2,20}$/.test(userCity)) {
			cityErrorMsg.innerText = "";
			return true;
		} else {
			cityErrorMsg.innerText = "Ville invalide, 2 à 20 caractères";
		}
	}
	// Email
	function validEmail() {
		const userEmail = userForm.email;
		const emailErrorMsg = document.getElementById("emailErrorMsg");
		if (/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userEmail)) {
			emailErrorMsg.innerText = "";
			return true;
		} else {
			emailErrorMsg.innerText = "Email invalide";
		}
	}

	if (validFirstName() && validLastName() && validAddress() && validCity() && validEmail()) {
		return true;
	} else {
		console.log("Champ invalide");
	}
}



/* Cart: Order */

// Cart: products Id: array
function cartToSend() {

	let cart = JSON.parse(localStorage.getItem("cart"));
	let userCart = [];
	for (let i = 0; i < cart.length; i++) {
		userCart.push(cart[i].itemId);
	}
	return userCart;
}


// Cart: products Id: array: valid => send to back => request Order Id
let userFormSubmit = document.getElementById("order");
userFormSubmit.addEventListener("click", (e) => {
	e.preventDefault();

	if (userInputCheck()) {
		const products = cartToSend();
		const toSend = {
			contact: {
				firstName: firstName.value,
				lastName: lastName.value,
				address: address.value,
				city: city.value,
				email: email.value,
			},
			products,
		};

		//  API: post
		fetch("http://localhost:3000/api/products/order", {
			method: "POST",
			headers: {
				// "Accept": "application/json",
				"Content-Type": "application/json"
			},
			body: JSON.stringify(toSend),
		})

			// Order Id: Url Storage
			.then((response) => response.json())
			.then((value) => {
				localStorage.clear();
				document.location.href = `./confirmation.html?id=${value.orderId}`;
			})
			.catch((error) => {
				console.log("Error: " + error);
			});
	}
});

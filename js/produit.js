// Add to cart & localStorage
const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", () => {
	const itemId = idVerification();
	const itemColor = document.getElementById("colors").value;
	const itemQuantity = document.getElementById("quantity").value;
	const itemName = document.getElementById("title");


	// Confirm color and quantity != 0
	if (itemColor === "") {
		alert("Choisir une couleur");
	} else if (itemQuantity == 0) {
		alert("Ajouter un article");
	} else {
		// Push in the localStorage
		const itemInCart = [itemId, itemQuantity, itemColor];
		localStorage.setItem("myItemInCart", JSON.stringify(itemInCart));
		window.location.href = "./cart.html";
	}


    	// Item already in cart
	for (var i = 0; i < itemName.length; i++) {
		if (itemName[i].innerText == title) {
			alert('Cet article est déjà dans le panier')
			return
		}
	}
});

// ***************
// Cart: Items: quantity: modify in DOM => Save in Local Storage
function itemQuantityUpdate() {
	let quantitySelector = document.querySelectorAll(".itemQuantity");
	for (let i = 0; i < quantitySelector.length; i++) {
		quantitySelector[i].addEventListener("change", (e) => {
			e.preventDefault();

			let articleDOM = quantitySelector[i].closest("article");
			let itemId = articleDOM.dataset.id;
			let itemColor = articleDOM.dataset.color;
			let localStorageKey = [itemId, itemColor];
			let itemQuantity = e.target.value;
			if (itemQuantity == 0) {
				alert("Ajouter un article");
			}
			localStorage.setItem(localStorageKey, itemQuantity);

			// Cart: Items: quantity: update => New quantity
			totalItemInCartUpdate();
		});
	}
}
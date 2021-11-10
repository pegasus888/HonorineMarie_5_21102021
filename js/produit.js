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
// array in localStorage
let cart = []
cart.push("itemId")
cart.push("itemQuantity")
cart.push("itemColor")

localStorage.setItem("myCart", JSON.stringify(cart));
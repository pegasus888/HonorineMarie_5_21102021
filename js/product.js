// Check for the Id in the URL
function idVerification() {
	let url = new URL(window.location.href);
	let searchParams = new URLSearchParams(url.search);
	if (searchParams.has("id")) {
		let id = searchParams.get("id");
		return id;
	} else {
		console.log("Error, no Id found in the URL");
	}
}

// Get Details for a specified product
async function getInfoById() {
	let id = idVerification();
	try {
		let response = await fetch(`http://localhost:3000/api/products/${id}`);
		return await response.json();
	} catch (error) {
		console.log("Error : " + error);
	}
}

// Handle the render on the HTML
(async function renderItem() {
	let item = await getInfoById();
	document.querySelector(".item__img").innerHTML += `<img src="${item.imageUrl}" alt="${item.altTxt}">`;
	document.getElementById("title").innerHTML += item.name;
	document.getElementById("price").innerHTML += item.price;
	document.getElementById("description").innerHTML += item.description;
	// Choice of item colors
	item.colors.forEach((color) => {
		let htmlContent = `<option value="${color}">${color}</option>`;
		document.getElementById("colors").innerHTML += htmlContent;
	});
})();


// Add to cart & localStorage
const addToCartBtn = document.getElementById("addToCart");
addToCartBtn.addEventListener("click", () => {
	const itemId = idVerification();
	const itemColor = document.getElementById("colors").value;
	const itemQuantity = document.getElementById("quantity").value;

	// Confirm color and quantity != 0
	if (itemColor === "") {
		alert("Choisir une couleur");
	} else if (itemQuantity == 0) {
		alert("Ajouter un article");
	} else {

		// Push to localStorage
		let cart = localStorage.getItem("cart");
		if (cart === null) {
			cart = [];
		}
		else {
			cart = JSON.parse(cart);
		}

		const cartContent = {
			itemId: itemId,
			itemQuantity: itemQuantity,
			itemColor: itemColor
		}
		let trouver=0;
		for (let i=0; i < cart.length; i++) {

			if ( itemId === cart[i].itemId ) {
			if ( itemColor === cart[i].itemColor) {
				trouver = 1;
			cart[i].itemQuantity = Number(cart[i].itemQuantity) + Number(itemQuantity);
			}
			}
		}
			if ( trouver === 0 ) {
				cart.push(cartContent);
			}


		// Add cart to Storage
		localStorage.setItem( "cart", JSON.stringify(cart));
		window.location.href = "./cart.html";
	}
});
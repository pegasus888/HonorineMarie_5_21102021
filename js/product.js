// Get the product's id from the URL
function idCheck() {
	let url = new URL(window.location.href);
	let searchParams = new URLSearchParams(url.search);
	if (searchParams.has("id")) {
		let id = searchParams.get("id");
		return id;
	} else {
		console.log("Error, no Id in the URL");
	}
}


// Get a single product by id from the API
async function getDetailsById() {
	let id = idCheck();
	try {
		let response = await fetch(`http://localhost:3000/api/products/${id}`);
		return await response.json();
	} catch (error) {
		console.log("Error : " + error);
	}
}


// Single Product: Display on product.html
(async function displayItem() {
	let item = await getDetailsById();
	document.querySelector(".item__img").innerHTML += `<img src="${item.imageUrl}" alt="${item.altTxt}">`;
	document.getElementById("title").innerHTML += item.name;
	document.getElementById("price").innerHTML += item.price;
	document.getElementById("description").innerHTML += item.description;

        // Single Product: Pick a Color
        item.colors.forEach((color) => {
            let htmlContent = `<option value="${color}">${color}</option>`;
            document.getElementById("colors").innerHTML += htmlContent;
        });
    })();


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


		// Cart = object: 3 items {id,qté,color}
		let cartContent = {
			id: itemId,
			quantity: itemQuantity,
			color: itemColor,
		};

		// Cart: localStorage: array: 3 items {id,qté,color}
let myLocalStorage = JSON.parse(localStorage.getItem("product"));

		// Check localStorage
		if (myLocalStorage === null) {
			myLocalStorage = [];
		}

		// Add to localStorage
		const addItemLocalStorage = () => {
			myLocalStorage.push(cartContent);
			localStorage.setItem("product", JSON.stringify(myLocalStorage));
		};


		  // Fonction qui vérifie si le même produit existe (même Id et même couleur)
		const raiseTheQuantityIfSameProduct = () => {
		let foundTheSameProduct = false;
		myLocalStorage.forEach((element) => {
			if (element.id === itemId && element.color === itemColor) {
			element.quantity += itemQuantity;
			foundTheSameProduct = true;
			}
		});
		if (!foundTheSameProduct) {
			// Appel de la fonction suivante :
			addItemLocalStorage();
		}
		};

		// Appel la Fonction suivante :
		raiseTheQuantityIfSameProduct();

		localStorage.setItem("product", JSON.stringify(myLocalStorage));

		// Fonction Confirmation ajout au panier
		const confirmation = () => {
		if (window.confirm(`Ajouté au panier! Cliquer OK pour voir votre panier ou ANNULER pour continuer le shopping 💸 !`)) {
			window.location.href = "cart.html";
		} else {
			window.location.href = "index.html";
		}
		};

		// Appel la Fonction suivante :
		confirmation();


				}
		});
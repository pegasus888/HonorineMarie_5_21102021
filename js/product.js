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


// Add to cart
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

            // Save in localStorage
            const itemInCart = [itemId, itemColor];
            localStorage.setItem(itemInCart, itemQuantity);
            window.location.href = "./cart.html";
        }
});
// Get the product's id
let params = (new URL(document.location)).searchParams;
let id = params.get('id');
console.log(id);


fetch('http://localhost:3000/api/products/' + id)
    .then(response => response.json())
    .then(items => {

const items = [... document.querySelectorAll(".item")];

// Get information for a single product
    let result = '';
items.forEach(item => {
    result += `
    <section class="item">
    <article>
        <div class="item__img">
            <img src=${product.imageUrl} alt=${product.altTxt}>
        </div>
        <div class="item__content">

            <div class="item__content__titlePrice">
            <h1 id=${product.name}</h1>
            <p>Prix : <span id=${product.price}</span>€</p>
            </div>

            <div class="item__content__description">
            <p class="item__content__description__title">Description :</p>
            <p id=${product.description}</p>
            </div>

            <div class="item__content__settings">
            <div class="item__content__settings__color">
                <label for="color-select">Choisir une couleur :</label>
                <select name="color-select" id="colors">
                    <option value="">--SVP, choisissez une couleur --</option>
                    <option value=${product.colors}</option>
                </select>
            </div>
    `
})
console.log(result);
document.getElementsByClassName("item").innerHTML=result;
    })
fetch('http://localhost:3000/api/products')
    .then(response => response.json())
    .then(products => {


    console.log(products)
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
console.log(result);
document.getElementById("items").innerHTML=result;
});

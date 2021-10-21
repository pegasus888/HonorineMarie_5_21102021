let params = (new URL(document.location)).searchParams;
let id = params.get('id'); // is the string "Jonathan Smith".
console.log(id);
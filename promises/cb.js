let lib=require("./lib");

console.log("before");
let amount=100;
let tocut=20;
function chargeCreditCard(){
    amount=amount-tocut;
    console.log("The amount is",amount);
}

let promiseObj=lib.promiseAnalayzer("tv");
promiseObj.then(chargeCreditCard);
promiseObj.then(chargeCreditCard);
console.log("after");
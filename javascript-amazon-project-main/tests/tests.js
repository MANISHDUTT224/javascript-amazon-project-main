import { formatmoney } from "../scripts/utils/money.js";
import {cart,addtocart} from "../data/cart.js";


console.log('test suite:testing formatmoney');
console.log("converting dollars to cents");
if(Number(formatmoney(2095))===20.95){
    console.log('passed');
}
else{
    
    console.log('failed');
}

console.log("works for 0");
if(Number(formatmoney(0))===0.00){
    console.log('passed');
}
else{
    console.log('failed');
}
console.log("rounding off to nearest zeros");
if(Number(formatmoney(2000.5))===20.01){
    console.log('passed');
}
else{
    console.log('failed');
}
if(Number(formatmoney(2000.4))===20.00){
    console.log('passed');
}
else{
    console.log('failed');
}
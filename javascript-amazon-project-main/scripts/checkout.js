import {renderOrderSummary} from './orders/orderSummary.js';
import {renderpaymentsummary} from './orders/paymentSummary.js';
import {loadProducts} from '../data/products.js';
import { loadCart } from '../data/cart.js';
import { loadProductsFetch } from '../data/products.js';
async function loadPage() {
    
    try{
    await loadProductsFetch();
    loadCart();
    //here for some reason i couldnt use await with a promise as loadCart() the payment summary is not rendering at load;
    /*
    await new Promise((resolve) => {
        loadCart(() => resolve());//reject(errorstring) can be used as errors in asynchronous programming
    });
    }
    */
   
    renderOrderSummary();
    renderpaymentsummary();
}
catch(error){
    console.log("Error occured .Please try again later");
}
}
loadPage();
// Promise.all([
//    loadProductsFetch(),
//     new Promise((resolve)=>{
//         loadCart(()=>{
//             resolve('value2');
//         });
//     })
// ]).then((vals)=>{
//     console.log(vals);
//     renderOrderSummary();
//     renderpaymentsummary();
// });
// loadProducts(()=>{
//     loadCart(()=>{
//         renderOrderSummary();
//         renderpaymentsummary();
//     });
// });


import {renderOrderSummary} from './orders/orderSummary.js';
import {renderpaymentsummary} from './orders/paymentSummary.js';
import {loadProducts} from '../data/products.js';
import { loadCart } from '../data/cart.js';
Promise.all([
    new Promise((resolve)=>{
        loadProducts(()=>{
            resolve('value1');
        });
    }),
    new Promise((resolve)=>{
        loadCart(()=>{
            resolve('value2');
        });
    })
]).then((vals)=>{
    console.log(vals);
    renderOrderSummary();
    renderpaymentsummary();
});
// loadProducts(()=>{
//     loadCart(()=>{
//         renderOrderSummary();
//         renderpaymentsummary();
//     });
// });


   

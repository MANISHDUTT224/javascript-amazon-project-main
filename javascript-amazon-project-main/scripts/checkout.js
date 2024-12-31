import {renderOrderSummary} from './orders/orderSummary.js';
import {renderpaymentsummary} from './orders/paymentSummary.js';
import {loadProducts} from '../data/products.js';
loadProducts(()=>{
    renderOrderSummary();
    renderpaymentsummary();
});

   

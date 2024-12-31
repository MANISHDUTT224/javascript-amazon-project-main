import {findproduct, products} from '../../data/products.js';
import {cart} from '../../data/cart.js';
import{findeliveryoption} from '../../data/deliveryoptions.js'
import { formatmoney } from '../utils/money.js';
import { addorder } from '../../data/orders.js';
export const renderpaymentsummary=()=>{
    let totalprice=0,shippingprice=0,cartqu=0;
    cart.forEach((cartItem)=>{
        let product=findproduct(cartItem.id);
        let deliveryopt=findeliveryoption(cartItem.deliveryid);
        shippingprice+=deliveryopt.deliveryprice;
        cartqu+=cartItem.quantity;
        totalprice=totalprice+product.priceCents*cartItem.quantity;
    });
    let totalpricebeforetaxes=shippingprice+totalprice;
    let taxprice=totalpricebeforetaxes*0.1;
    let totalpricents=totalpricebeforetaxes+taxprice;
    let paymentSummaryHTML=`<div class="payment-summary-title">
            Order Summary
          </div>

          <div class="payment-summary-row">
            <div>Items (${cartqu}):</div>
            <div class="payment-summary-money">$${formatmoney(totalprice)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Shipping &amp; handling:</div>
            <div class="payment-summary-money">$${formatmoney(shippingprice)}</div>
          </div>

          <div class="payment-summary-row subtotal-row">
            <div>Total before tax:</div>
            <div class="payment-summary-money">$${formatmoney(totalpricebeforetaxes)}</div>
          </div>

          <div class="payment-summary-row">
            <div>Estimated tax (10%):</div>
            <div class="payment-summary-money">$${formatmoney(taxprice)}</div>
          </div>

          <div class="payment-summary-row total-row">
            <div>Order total:</div>
            <div class="payment-summary-money">$${formatmoney(totalpricents)}</div>
            <button class="place-order-button button-primary js-place-order">
            Place your order
          </button>`;
            document.querySelector('.payment-summary').innerHTML=paymentSummaryHTML;
            document.querySelector('.js-place-order').addEventListener('click',async()=>{
             const response=await fetch('https://supersimplebackend.dev/orders',{
              method:'POST',
              headers:{
                'Content-Type':'application/json'
              },
              body:JSON.stringify({cart:cart})
             });
             const order=await response.json();
             addorder(order);
             window.location.href="orders.html";
            });
            
}


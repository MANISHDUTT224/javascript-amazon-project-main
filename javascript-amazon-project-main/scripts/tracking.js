import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { findproduct,loadProductsFetch } from '../data/products.js';
import { findorder } from '../data/orders.js';
async function loadPage(){
    await loadProductsFetch();
    const url=new URL(window.location.href);
    const orderid=url.searchParams.get('orderId');
    const productid=url.searchParams.get('productId');
    const order=findorder(orderid);
    const product=findproduct(productid);
    console.log(order);
    let trackHTML=``;
    let matchproduct;
    order.products.forEach((prod)=>{
        if(prod.productId===productid){
            matchproduct=prod;
        }
    });
    console.log(matchproduct); 
    let percentprogress;
    let currenttime=dayjs();
    let ordertime=dayjs(order.orderTime);
    let deliverytime=dayjs(matchproduct.estimatedDeliveryTime);
    percentprogress=(currenttime-ordertime)/(deliverytime-ordertime)*100; 
    trackHTML+=`<div class="order-tracking">
        <a class="back-to-orders-link link-primary" href="orders.html">
          View all orders
        </a>

        <div class="delivery-date">
          Arriving on ${dayjs(matchproduct.estimatedDeliveryTime).format('dddd MMMM D')}
        </div>

        <div class="product-info">
          ${product.name}
        </div>

        <div class="product-info">
          Quantity:${matchproduct.quantity}
        </div>

        <img class="product-image" src="${product.image}">

        <div class="progress-labels-container">
          <div class="progress-label${(percentprogress<50)?'currentstatus':''}">
            Preparing
          </div>
          <div class="progress-label${(percentprogress>=50 && percentprogress<100)?'current-status':''}">
            Shipped
          </div>
          <div class="progress-label${(percentprogress>=100)?'current-status':''}">
            Delivered
          </div>
        </div>

        <div class="progress-bar-container">
          <div class="progress-bar" style="width:${percentprogress}%;"></div>
        </div>
      </div>`;
      document.querySelector('.js-order-tracking').innerHTML=trackHTML;
}
loadPage();
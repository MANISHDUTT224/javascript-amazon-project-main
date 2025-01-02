import { formatmoney } from "../scripts/utils/money.js";
import { findproduct, loadProductsFetch } from "./products.js";
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { addtocart,cart, totalcartquantity,saveTostorage } from "./cart.js";
let orders=JSON.parse(localStorage.getItem('orders'))||[];

export const addorder=((order)=>{
    console.log(typeof order);
    orders.unshift(order);
    saveToStorage();
    
});
export const findorder=((orderid)=>{
    let matchorder;
    orders.forEach((order)=>{
        if(order.id===orderid){
            matchorder=order;
        }
    });
    return matchorder;
})
const saveToStorage=(()=>{
    localStorage.setItem('orders',JSON.stringify(orders));
});
async function loadPage(){
    await loadProductsFetch();
    document.querySelector('.cart-quantity').innerHTML=totalcartquantity(); 
    const productslistHTML=((order)=>{
        let productHTML='';
        order.products.forEach((product)=>{
            const matchingproduct=findproduct(product.productId);

            productHTML+=`
            <div class="product-image-container">
                  <img src="${matchingproduct.image}">
                </div>
    
                <div class="product-details">
                  <div class="product-name">
                    ${matchingproduct.name}
                  </div>
                  <div class="product-delivery-date">
                    Arriving on: ${dayjs(matchingproduct.estimatedDeliveryTime).format('MMMM D')}
                  </div>
                  <div class="product-quantity">
                    Quantity: ${product.quantity}
                  </div>
                  <button class="buy-again-button button-primary js-buy-again" data-product-id="${matchingproduct.id}" data-product-quantity="${product.quantity}">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                  </button>
                </div>
    
                <div class="product-actions">
                  <a href="tracking.html?orderId=${order.id}&productId=${matchingproduct.id}">
                    <button class="track-package-button button-secondary data-product">
                      Track package
                    </button>
                  </a>
                </div>`;
               
        });
    
    return productHTML;
    });
    let orderHTML='';
    //console.log(orders);
    orders.forEach((order)=>{
        const ordertimestring=dayjs(order.orderTime).format('MMMM D');
        orderHTML+=`<div class="order-container">
        <div class="order-header">
          <div class="order-header-left-section">
            <div class="order-date">
              <div class="order-header-label">Order Placed:</div>
              <div>${ordertimestring}</div>
            </div>
            <div class="order-total">
              <div class="order-header-label">Total:</div>
              <div>$${formatmoney(order.totalCostCents)}</div>
            </div>
          </div>
          <div class="order-header-right-section">
            <div class="order-header-label">Order ID:</div>
            <div>${order.id}</div>
          </div>
        </div>
        <div class="order-details-grid">
          ${productslistHTML(order)}
        </div>
      </div>`;
    });

//console.log(orderHTML);
document.querySelector('.orders-grid').innerHTML=orderHTML; 
document.querySelectorAll('.js-buy-again').forEach((button)=>{
    button.addEventListener('click',()=>{
       // console.log(button.dataset.productId);
        const matchprod=findproduct(button.dataset.productId);
        const quant=button.dataset.productQuantity;
        let found=false;
       
        cart.forEach((cartItem)=>{
            if(cartItem.id===matchprod.id){
                cartItem.quantity+=Number(quant);
                found=true;
            }
            //console.log(cartItem);
            
        });
        if(!found){
            
                cart.push({id:matchprod,productId:matchprod,quantity:Number(quant),deliveryid:'1'});
            
        }
        console.log(cart);
        saveTostorage();
        // addtocart(button.dataset.productId);
        //console.log("Clicked");
        button.innerHTML="Added";
        setTimeout(()=>{
            button.innerHTML=`<img class="buy-again-icon" src="images/icons/buy-again.png">
                            <span class="buy-again-message">Buy it again</span>`;
        },1000);
        });
       
    });
    loadPage();
   
}
loadPage();

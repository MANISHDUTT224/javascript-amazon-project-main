import {cart,RemoveFromCart,updatenewquantity} from '../../data/cart.js';
import {products,findproduct} from "../../data/products.js";
import { formatmoney } from '../utils/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { deliveryoptions,findeliveryoption } from '../../data/deliveryoptions.js';
import { updatedeliverydate } from '../../data/cart.js';
import { renderpaymentsummary } from './paymentSummary.js';

export function renderOrderSummary(){
    renderpaymentsummary();
let cartTotalHTML='';
const generatedeliveryoption=((productid,cartItem)=>{
  
  let HTMLDELIVERY='';
  let delivid=cartItem.deliveryid;
  let deliverydate,deliveryprice;
  deliveryoptions.forEach((option)=>{
   
      deliverydate=(dayjs().add(option.deliverydays,'day'));
      let datestring=deliverydate.format('dddd, MMMM D');
      let getday=deliverydate.format('dddd');
       console.log("Initial day: "+getday);
      if(getday==='Saturday'){
        deliverydate=(deliverydate.add(2,'day'));
        datestring=deliverydate.format('dddd, MMMM D');
        getday=deliverydate.format('dddd');
      }
      else if(getday==='Sunday'){
        deliverydate=(deliverydate.add(1,'day'));
        datestring=deliverydate.format('dddd, MMMM D');
        getday=deliverydate.format('dddd');
      }
      console.log(" Changed to: "+getday);
      deliveryprice=option.deliveryprice;
    
  let formattedelivery=deliveryprice===0?"FREE":"$"+formatmoney(deliveryprice);
  
  const isChecked=(delivid===option.deliveryid)?"checked":"";
  HTMLDELIVERY+=`<div class="delivery-option-${productid} js-delivery-options " data-product-id="${productid}" data-delivery-id="${option.deliveryid}">
                  <input type="radio" ${isChecked}
                    class="delivery-option-input"
                    name="delivery-option-${productid}">
                  <div>
                    <div class="delivery-option-date">
                      ${datestring}
                    </div>
                    <div class="delivery-option-price">
                      ${formattedelivery} Shipping
                    </div>
                  </div>
                </div>`
  });
  return HTMLDELIVERY;
}); 
const updatecheckincart=()=>{
  let updcart=JSON.parse(localStorage.getItem('storage'));  
  if(!updcart){
    updcart=cart;
  }
    
      let cartquantity=0;
      updcart.forEach((item)=>{
          cartquantity+=item.quantity;
      });
    
    document.querySelector('.checkout-header-middle-section').innerHTML=`Checkout (${cartquantity} items<a class="return-to-home-link"
            href="amazon.html">  </a>)`;
}
updatecheckincart();
cart.forEach((cartItem)=>{
    
    let ProductId=cartItem.id;
    let matchingproduct=findproduct(ProductId);
    
    
    let deliveryoption=findeliveryoption(cartItem.deliveryid);
    let deliverydate=(dayjs().add(deliveryoption.deliverydays,'day'));
      let datestring=deliverydate.format('dddd, MMMM D');
      let getday=deliverydate.format('dddd');
      if(getday==='Saturday'){
        deliverydate=(deliverydate.add(2,'day'));
        datestring=deliverydate.format('dddd, MMMM D');
      }
      else{
        deliverydate=(deliverydate.add(1,'day'));
        datestring=deliverydate.format('dddd, MMMM D');
      }
    
    cartTotalHTML+=`<div class="cart-item-container js-cart-item-${matchingproduct.id}">
            <div class="delivery-date">
              Delivery date: ${datestring}
            </div>

            <div class="cart-item-details-grid">
              <img class="product-image"
                src="${matchingproduct.image}">

              <div class="cart-item-details">
                <div class="product-name">
                 ${matchingproduct.name}
                </div>
                <div class="product-price">
                  $${formatmoney(matchingproduct.priceCents)}
                </div>
                <div class="product-quantity">
                  <span>
                    Quantity: <span class="quantity-label${matchingproduct.id}">${cartItem.quantity}</span>
                  </span>
                  <span class="update-quantity-link link-primary js-update-button" data-product-id="${matchingproduct.id}">

                    Update
                    
                  </span>
                  <input class="quantity-input js-quantity${matchingproduct.id}" type="text">
                    <span class="save-quantity-link link-primary" data-product-id="${matchingproduct.id}">Save</span>
                  <span class="delete-quantity-link link-primary js-delete-button" data-product-id="${matchingproduct.id}">
                    Delete
                  </span>
                </div>
              </div>

              <div class="delivery-options" >
                <div class="delivery-options-title">
                  Choose a delivery option:
                </div>
                ${generatedeliveryoption(matchingproduct.id,cartItem)}
              </div>
            </div>
          </div>`;
        
document.querySelector('.order-summary').innerHTML=cartTotalHTML;
    
});

document.querySelectorAll('.js-delete-button').forEach((link)=>{
    link.addEventListener('click',()=>{
      
       const id=link.dataset.productId;
       RemoveFromCart(id);
       renderOrderSummary();
     renderpaymentsummary();
       
      //  const removedproduct=document.querySelector(`.js-cart-item-${id}`);
       //removedproduct.remove() 
       
       updatecheckincart(); 
    });
    
});
document.querySelectorAll('.js-update-button').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productid=button.dataset.productId;
 
    const container=document.querySelector(`.js-cart-item-${productid}`);
   // console.log(container.classList);
    
    container.classList.add('is-editing');

    
  });
}); 
document.querySelectorAll('.save-quantity-link').forEach((button)=>{
  button.addEventListener('click',()=>{
    const productid=button.dataset.productId;
    
    const container=document.querySelector(`.js-cart-item-${productid}`);
    container.classList.remove('is-editing');
    const newquantity=document.querySelector(`.js-quantity${productid}`).value;
    updatenewquantity(productid,Number(newquantity));
    
  });
});
document.querySelectorAll('.js-delivery-options').forEach((button)=>{
button.addEventListener('click',()=>{
  
  const productid=button.dataset.productId;
  const deliveryid=button.dataset.deliveryId;
  updatedeliverydate(productid,deliveryid);
  renderOrderSummary();
});
});
}
renderOrderSummary();
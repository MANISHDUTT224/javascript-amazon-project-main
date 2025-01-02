 import { renderpaymentsummary } from "../scripts/orders/paymentSummary.js";
 import '../data/cart-class.js';
 export let cart;
 export const loadFromStorage=(()=>{
 cart=JSON.parse(localStorage.getItem('storage'));
 if(!cart){
 cart=[{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    productId:"e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryid:'1'

 },{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryid:'2'
 }];
}
 });
 loadFromStorage();
 export const saveTostorage=()=>{
    localStorage.setItem('storage',JSON.stringify(cart));
  }
 export const addtocart=(productId)=>{
     let matchitem;
     cart.forEach((cartItem)=>{
         if(cartItem.id===productId){
             matchitem=cartItem;
         }
     });
     const productquantity=document.querySelector(`.js-quantity-selector-${productId}`).value;
     if(matchitem){
          matchitem.quantity+=Number(productquantity);
        matchitem.quantity+=1;
     }
     else{
      cart.push({id:productId,productId:productId,quantity:Number(productquantity),deliveryid:'1'});
     }
     console.log(cart); 
     saveTostorage();
 };
 export const RemoveFromCart=(productid)=>{
    let newcart=[];
    cart.forEach((cartItem)=>{
        if(cartItem.id!==productid){
            newcart.push(cartItem);
        }
    });
    cart=newcart;
    saveTostorage();
 }
 export  function totalcartquantity(){
    var total=0;
    let cart;   
    cart=JSON.parse(localStorage.getItem('storage'));
    cart.forEach((item)=>{
        total+=item.quantity;
    });
    return total;
 }
 export const updatenewquantity=((productid,newproductquantity)=>{
    let matchingproduct;
    let curtotalcartcheckin=0;
    cart.forEach((item)=>{
        if(item.id===productid){
            matchingproduct=item;
        }
        curtotalcartcheckin+=item.quantity;
    });
    if(newproductquantity<=0){
        document.querySelector(`.js-cart-item-${productid}`).remove();
        document.querySelector(`.checkout-header-middle-section`).innerHTML=`Checkout (${curtotalcartcheckin-matchingproduct.quantity} items<a class="return-to-home-link"
            href="amazon.html">  </a>)`;
        
        RemoveFromCart(productid);
        renderpaymentsummary();
    }

    else{
    matchingproduct.quantity=newproductquantity;
    
    document.querySelector(`.quantity-label${productid}`).innerHTML=`${newproductquantity}`;
    renderpaymentsummary();
    }
    saveTostorage();
    document.querySelector(`.checkout-header-middle-section`).innerHTML=`Checkout (${totalcartquantity()} items<a class="return-to-home-link"
    href="amazon.html">  </a>)`;
 });
 export const calculatecartquantity=()=>{
    let updcart=JSON.parse(localStorage.getItem('storage'));  
  if(!updcart){
    updcart=cart;
  }
    
      let cartquantity=0;
      updcart.forEach((item)=>{
          cartquantity+=item.quantity;
      });
      return cartquantity;
  }
  
 export const updatedeliverydate=((productid,deliveryid)=>{
    let matchingitem;
    cart.forEach((cartItem)=>{
        if(cartItem.id===productid){
            matchingitem=cartItem;
        }
    });
    matchingitem.deliveryid=deliveryid;
    saveTostorage();
 });
 export const loadCart=(()=>{
   const xhr=new XMLHttpRequest();
   xhr.addEventListener('load',()=>{ 
      console.log(xhr.response);
     
     });;
     xhr.addEventListener('error',()=>{
        console.log("Error occured.Please try again later");
     })
     
     xhr.open('GET','https://supersimplebackend.dev/cart');
   xhr.send();
   });
   
export async function loadCartFetch(){
    const response=await fetch("https://supersimplebackend.dev/cart");
    const cart=response.text();
    //console.log(cart);
}


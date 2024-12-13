 export let cart=[];
 export const addtocart=(productId)=>{
     let matchitem;
     cart.forEach((item)=>{
         if(item.productId===productId){
             matchitem=item;
         }
     });
     if(matchitem){
         matchitem.quantity++;
     }
     else{
         const productquantity=document.querySelector(`.js-quantity-selector-${productId}`).value;
       
     cart.push({productId,quantity:Number(productquantity)});
     
     }
     console.log(cart);
 };
 export let cart=[{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2

 },{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
 }];
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
 export const RemoveFromCart=(productid)=>{
    let newcart=[];
    cart.forEach((item)=>{
        if(item.id!==productid){
            newcart.push(item);
        }
    });
    cart=newcart;
 }
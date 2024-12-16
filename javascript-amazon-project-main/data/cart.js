 export let cart=JSON.parse(localStorage.getItem('storage'));
 if(!cart){
 cart=[{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2

 },{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1
 }];
}
 const saveTostorage=()=>{
    localStorage.setItem('storage',JSON.stringify(cart));
    console.log("Saved successfully ",JSON.parse(localStorage.getItem('storage')));
  }
 export const addtocart=(productId)=>{
     let matchitem;
     cart.forEach((cartItem)=>{
         if(cartItem.id===productId){
             matchitem=cartItem;
         }
     });
    // console.log(matchitem);
     if(matchitem){
         matchitem.quantity++;
     }
     else{
         const productquantity=document.querySelector(`.js-quantity-selector-${productId}`).value;
       
     cart.push({id:productId,quantity:Number(productquantity)});
     
     }
     //console.log(cart);
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
 
 export let cart=JSON.parse(localStorage.getItem('storage'));
 if(!cart){
 cart=[{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryid:'1'

 },{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryid:'2'
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
    
     if(matchitem){
         matchitem.quantity+=Number(document.querySelector(`.js-quantity-selector-${productId}`).value);
         
     }
     else{
         const productquantity=document.querySelector(`.js-quantity-selector-${productId}`).value;
       
     cart.push({id:productId,quantity:Number(productquantity),deliveryid:'1'});
     
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
 const totalcartquantity=()=>{
    var total=0;
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
    }

    else{
    matchingproduct.quantity=newproductquantity;
    
    document.querySelector(`.quantity-label${productid}`).innerHTML=`${newproductquantity}`;
    }
    saveTostorage();
    document.querySelector(`.checkout-header-middle-section`).innerHTML=`Checkout (${totalcartquantity()} items<a class="return-to-home-link"
    href="amazon.html">  </a>)`;
 });
 export const updatedeliverydate=((productid,deliveryid)=>{
    let matchingitem;
    cart.forEach((cartItem)=>{
        if(cartItem.id===productid){
            matchingitem=cartItem;
        }
    });
   // console.log(deliveryid);
    matchingitem.deliveryid=deliveryid;
    console.log(cart);
    saveTostorage();
 })
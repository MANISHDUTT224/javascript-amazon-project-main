 import { renderpaymentsummary } from "../scripts/orders/paymentSummary.js";
 const CartGenerator=((localStoragekey)=>{
    let  Cart={
        cart:undefined,
        loadFromStorage(){
            this.cart=JSON.parse(localStorage.getItem(localStoragekey));
            if(!this.cart){
            this.cart=[{
               id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
               quantity:2,
               deliveryid:'1'
           
            },{
               id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
               quantity:1,
               deliveryid:'2'
            }];
           }
        },
       saveTostorage(){
            localStorage.setItem('localStoragekey',JSON.stringify(Cart.cart));
            //console.log("Saved successfully ",JSON.parse(localStorage.getItem('cart-oops')));
          },
          addtocart(productId){
            let matchitem;
            this.cart.forEach((cartItem)=>{
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
             this.cart.push({id:productId,quantity:Number(productquantity),deliveryid:'1'});
            }
            this.saveTostorage();
        },
        RemoveFromCart(productid){
            let newcart=[];
            this.cart.forEach((cartItem)=>{
                if(cartItem.id!==productid){
                    newcart.push(cartItem);
                }
            });
            this.cart=newcart;
            this.saveTostorage();
         },
         totalcartquantity(){
            var total=0;
            this.cart=JSON.parse(localStorage.getItem(localStoragekey));
            this.cart.forEach((item)=>{
                total+=item.quantity;
            });
            return total;
         },
         updatenewquantity(productid,newproductquantity){
            let matchingproduct;
            let curtotalcartcheckin=0;
            this.cart.forEach((item)=>{
                if(item.id===productid){
                    matchingproduct=item;
                }
                curtotalcartcheckin+=item.quantity;
            });
            if(newproductquantity<=0){
                document.querySelector(`.js-cart-item-${productid}`).remove();
                document.querySelector(`.checkout-header-middle-section`).innerHTML=`Checkout (${curtotalcartcheckin-matchingproduct.quantity} items<a class="return-to-home-link"
                    href="amazon.html">  </a>)`;
                
                this.RemoveFromCart(productid);
                renderpaymentsummary();
            }
        
            else{
            matchingproduct.quantity=newproductquantity;
            
            document.querySelector(`.quantity-label${productid}`).innerHTML=`${newproductquantity}`;
            renderpaymentsummary();
            }
            this.saveTostorage();
            document.querySelector(`.checkout-header-middle-section`).innerHTML=`Checkout (${totalcartquantity()} items<a class="return-to-home-link"
            href="amazon.html">  </a>)`;
         },
         updatedeliverydate(productid,deliveryid){
            let matchingitem;
            this.cart.forEach((cartItem)=>{
                if(cartItem.id===productid){
                    matchingitem=cartItem;
                }
            });
           // console.log(deliveryid);
            matchingitem.deliveryid=deliveryid;
           // console.log(cart);
            this.saveTostorage();
         }
    
    
     }
     return Cart;
     
 });
const Cart=CartGenerator('cart-oops');
const BusinessCart=CartGenerator('cart-business');
 Cart.loadFromStorage();

 let cart1=[{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    quantity:2,
    deliveryid:'1'

 },{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    quantity:1,
    deliveryid:'2'
 },
 {
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    quantity:3,
    deliveryid:'3'
 }
];

localStorage.setItem('cart-business',JSON.stringify(cart1));
 
 BusinessCart.loadFromStorage();

 console.log(Cart);
 console.log(BusinessCart);
 



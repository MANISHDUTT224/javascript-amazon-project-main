import {cart} from '../data/cart.js';
import {products} from '../data/products.js';
let productHTML='',html;
products.forEach((product)=>{
    
    html=
    `<div class="product-container">
          <div class="product-image-container">
            <img class="product-image"
              src="${product.image}">
          </div>

          <div class="product-name limit-text-to-2-lines">
            ${product.name}
          </div>

          <div class="product-rating-container">
            <img class="product-rating-stars"
              src="images/ratings/rating-${product.rating.stars*10}.png">
            <div class="product-rating-count link-primary">
              ${product.rating.count}
            </div>
          </div>

          <div class="product-price">
            $${((product.priceCents)/100).toPrecision(4)}
          </div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>

          <div class="product-spacer"></div>

          <div class="added-to-cart add-${product.id}">
            <img src="images/icons/checkmark.png">
            Added
          </div>

          <button class="add-to-cart-button button-primary " data-product-id="${product.id}">
            Add to Cart
          </button>
        </div>`;
        
        productHTML+=html;
      
});

let cartquantity;
document.querySelector('.products-grid').innerHTML=productHTML;
document.querySelectorAll('.add-to-cart-button').forEach((productbutton)=>{
    productbutton.addEventListener('click',(item)=>{
       // const productId=productbutton.dataset.productId;
       let timeout;
       const{productId}=productbutton.dataset;
        let matchitem;
        document.querySelector(`.add-${productId}`).classList.add('added');
        if(timeout){
            clearTimeout(timeout);
        }
        else{
         timeout=setTimeout(()=>{
            document.querySelector(`.add-${productId}`).classList.remove('added')
    },2000);
}
        
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
          //  console.log(typeof productquantity);
        cart.push({productId,quantity:Number(productquantity)});
        }
        
        console.log(cart);
        cartquantity=0;
        cart.forEach((item)=>{
            cartquantity+=item.quantity;
        });
        document.querySelector('.cart-quantity').innerHTML=`${cartquantity}`;
    });
    
});

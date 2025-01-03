import {cart,addtocart} from '../data/cart.js';
import {products,loadProducts} from '../data/products.js';
import { calculatecartquantity } from '../data/cart.js';

let productHTML='',html;
const renderProductsGrid=(()=>{
  let url=new URL(window.location.href);
  let searchval=url.searchParams.get('search');
  let fproducts=products;
  if(searchval){
    fproducts=products.filter((product)=>{
      return product.name.includes(searchval);
      let matchingKeyword = false;

      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });

      return matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase());
    });
  };
  fproducts.forEach((product)=>{
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
                src=${product.getStarsUrl()}>
              <div class="product-rating-count link-primary">
                ${product.rating.count}
              </div>
            </div>

            <div class="product-price">
              ${product.getPrice()}
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
            ${product.extraInfoHTML()}
            
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
  
  
  const updatecart=()=>{

      document.querySelector('.cart-quantity').innerHTML=`${calculatecartquantity()}`;
  }
  updatecart();

  document.querySelector('.products-grid').innerHTML=productHTML;
  document.querySelectorAll('.add-to-cart-button').forEach((productbutton)=>{
      productbutton.addEventListener('click',(item)=>{
        
        let timeout;
        
        const id=productbutton.dataset.productId;
        
          document.querySelector(`.add-${id}`).classList.add('added');
          if(timeout){
              clearTimeout(timeout);
          }
          else{
          timeout=setTimeout(()=>{
              document.querySelector(`.add-${id}`).classList.remove('added')
      },2000);
  }
      addtocart(id);
          
      updatecart(); 
      });
    
  });
  document.querySelector('.js-search-button').addEventListener('click',()=>{
    const search=document.querySelector('.js-search-bar').value;
    window.location.href=`index.html?search=${search}`;
  });
  document.querySelector('body').addEventListener('keydown',(event)=>{
    if(event.key==='Enter'){
    const search=document.querySelector('.js-search-bar').value;
    window.location.href=`index.html?search=${search}`;
    }
  });
});
loadProducts(renderProductsGrid);
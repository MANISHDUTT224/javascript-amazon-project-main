import {cart,addtocart,loadFromStorage} from '../../data/cart.js';
import { deliveryoptions } from '../../data/deliveryoptions.js';

describe('test suite:cart insertion',()=>{
    it('adds existing item to cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([{
                id:'15b6fc6f-327a-4ec4-896f-486349e85a3d',
                quantity:1,
                deliveryoption:'1'
            }]);
        });
        loadFromStorage();
        addtocart("15b6fc6f-327a-4ec4-896f-486349e85a3d");
        expect(localStorage.setItem).toHaveBeenCalledTimes(1);
      
        expect(cart[0].id).toEqual('15b6fc6f-327a-4ec4-896f-486349e85a3d');
        expect(cart[0].quantity).toEqual(2);
    });
    it('adds new item to cart',()=>{
        spyOn(localStorage,'setItem');
        spyOn(localStorage,'getItem').and.callFake(()=>{
            return JSON.stringify([]);
        });
        loadFromStorage();
        addtocart( "15b6fc6f-327a-4ec4-896f-486349e85a3d");
        //console.log(cart);
        
            expect(cart.length).toEqual(1);
            expect(localStorage.setItem).toHaveBeenCalledTimes(1);
            expect(cart[0].id).toEqual( "15b6fc6f-327a-4ec4-896f-486349e85a3d");
            
 
    });
});
let orders=[];
export const addorder=((order)=>{
    orders.unshift(order);
    saveToStorage();
    //console.log(orders);
});
const saveToStorage=(()=>{
    localStorage.setItem('orders',orders);
});
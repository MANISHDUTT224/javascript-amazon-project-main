 export const findeliveryoption=((deliveryid)=>{
    let delivoption;
    deliveryoptions.forEach((option)=>{
        if(option.deliveryid===deliveryid){
            delivoption=option;
        }
    });
    return delivoption;
 })
 export const deliveryoptions=[{
    deliveryid:'1',
    deliverydays:7,
    deliveryprice:0
},
{
    deliveryid:'2',
    deliverydays:3,
    deliveryprice:499,
},
{
    deliveryid:'3',
    deliverydays:1,
    deliveryprice:999
}
];
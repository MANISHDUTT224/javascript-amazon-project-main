const xhr=new XMLHttpRequest();
xhr.addEventListener('load',()=>{
    console.log(xhr.response);
})

xhr.open('GET',"https://supersimplebackend.dev/images/apple.jpg");
xhr.send();

//GET -used to acquire a specific data from a resource


//Status Codes:
/*
Starting with 2 -Successful
Starting with 4-Error on our side-accesing unsupported paths
Starting with 5-Internal error /System crashed lol
*/
//Refer docs for using other paths:https://supersimplebackend.dev/documentation
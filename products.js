fetch("https://dummyjson.com/products")
.then(response => response.json())
.then(data => {
    console.log("success",data.products);
})
.catch(error=>{
    console.log("error : ",error);
})
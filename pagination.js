let currentPage =1;
let itemsPerPage=8;
let allProducts=[];

let container = document.getElementById("productList");
let prevBtn = document.getElementById("prevBtn");
let nextBtn = document.getElementById("nextBtn");
let pageInfo = document.getElementById("pageInfo");
fetch("https://dummyjson.com/products")
.then(res=>res.json())
.then(data=>{
    allProducts =data.products;
    if(allProducts.length===0){
        container.innerHTML="<p>No products available</p>";
        prevBtn.disabled=true;
        nextBtn.disabled=true;
        pageInfo.innerText="";
        return;
    }
    renderPage();
})
.catch(err=>console.log(err));


function renderPage(){
    container.innerHTML="";
    console.log(5);
    let start = (currentPage-1)*itemsPerPage;
    let end = start +itemsPerPage;

    let pageItems= allProducts.slice(start,end);
    pageItems.forEach(product=>{
        let card = document.createElement("div");
        card.className="card";
        card.innerHTML=`
        <img src="${product.thumbnail}">
        <h3>${product.title}</h3>
        <p>${product.price}</p>`;
        card.addEventListener("click",()=>{
            // Store viewed product in localStorage
            let viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];
            const productExists = viewedProducts.some(p => p.id === product.id);
            if(!productExists) {
                viewedProducts.unshift({
                    id: product.id,
                    title: product.title,
                    price: product.price,
                    thumbnail: product.thumbnail,
                    viewedAt: Date.now()
                });
                localStorage.setItem("viewedProducts", JSON.stringify(viewedProducts));
            }
            window.location.href=`productDetails.html?id=${product.id}`;
        });
        container.appendChild(card);
    });
    let totalPages=Math.ceil(allProducts.length / itemsPerPage);
    pageInfo.innerText=`Page ${currentPage} of ${totalPages}`;

    prevBtn.disabled = currentPage ===1;
    nextBtn.disabled = currentPage ===totalPages;
}

prevBtn.addEventListener("click",()=>{
    currentPage--;
    renderPage();
    window.scrollTo({top:0, behavior: "smooth"});
});

nextBtn.addEventListener("click",()=>{
    currentPage++;
    renderPage();
    window.scrollTo({top:0, behavior:"smooth"});
});

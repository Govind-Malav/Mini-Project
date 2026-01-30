fetch("https://dummyjson.com/products")
.then(response => response.json())
.then(data => {
    let grid = document.getElementById("productGrid");

    data.products.forEach(product => {
        let card = document.createElement("div");
        card.className = "card";

        card.innerHTML = `
            <img src="${product.thumbnail}">
            <h4>${product.title}</h4>
            <p>₹ ${product.price}</p>
        `;

        grid.appendChild(card);
    });
})
.catch(err => console.log(err));


const searchBtn = document.getElementById("searchbtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if(!query) return;
    // console.log("Searching for:", query);


    //history suggestion
    let history=JSON.parse(localStorage.getItem("searchhistory")) || [];
    if(!history.includes(query)){
        history.push({
            query:query,
            time:Date.now()
        });
        localStorage.setItem("searchHistory", JSON.stringify(history));
    }
    
    window.location.href =`search.html?q=${encodeURIComponent(query)}`; 
    searchInput.value = "";
    
    
});


// If the page includes `productList`, pagination.js handles fetching and rendering.
// Skip the global fetch to avoid rendering all products on a single page.
if (!document.getElementById("productList")) {
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
            card.addEventListener("click",()=>{
                console.log("clicked on product :",product.id);
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
            })
        });
    })
    .catch(err => console.log(err));
}


const searchBtn = document.getElementById("searchbtn");
const searchInput = document.getElementById("searchInput");

searchBtn.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if(!query) return;
    // console.log("Searching for:", query);


    // to store search history in local storage
    let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    if(!history.includes(query)){
        history.push({
        query: query,
        time:Date.now()
    });
    localStorage.setItem("searchHistory", JSON.stringify(history));
    }
    // ................
    
    window.location.href =`search.html?q=${encodeURIComponent(query)}`; 
    searchInput.value = "";
});


// searchBtn.addEventListener("click", () => {

//     let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
//     if(!history.includes(query)){
//         history.push({
//         query: query,
//         time:Date.now()
//     });
//     localStorage.setItem("searchHistory", JSON.stringify(history));
//     }

//     window.location.href =`search.html?q=${encodeURIComponent(query)}`; 
//     searchInput.value = "";
// });


const suggestionBox = document.getElementById("suggestions");

searchInput.addEventListener("input", () => {
    // console.log("Suggeestion working");
    const text= searchInput.value.toLowerCase();
    const history = JSON.parse(localStorage.getItem("searchHistory")) || [];
    const matches = history.filter(item => item.query.toLowerCase().includes(text));
    // console.log(history);
    suggestionBox.innerHTML = "";

    console.log(matches);
    matches.forEach(item => {
        const div = document.createElement("div");
        div.className = "suggestion-item";
        div.innertext = item.query;

        div.addEventListener("click", () => {
            searchInput.value = item.query;
            suggestionBox.innerHTML = "";
        });

        suggestionBox.appendChild(div);
    });
    });
    const historyBtn = document.getElementById("historyList");
historyBtn.addEventListener("click", () => {
    window.location.href = "searchhistory.html";
});

// View History button
const viewHistoryBtn = document.getElementById("viewHistory");
if(viewHistoryBtn) {
    viewHistoryBtn.addEventListener("click", () => {
        window.location.href = "viewHistory.html";
    });
}
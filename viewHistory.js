// Display viewed products
const historyGrid = document.getElementById("historyGrid");
const clearHistoryBtn = document.getElementById("clearHistoryBtn");

function displayViewHistory() {
    const viewedProducts = JSON.parse(localStorage.getItem("viewedProducts")) || [];
    
    if(viewedProducts.length === 0) {
        historyGrid.innerHTML = "<div class='empty-message'>No products viewed yet. Start browsing now!</div>";
        clearHistoryBtn.disabled = true;
        clearHistoryBtn.style.opacity = "0.5";
        clearHistoryBtn.style.cursor = "not-allowed";
        return;
    }
    
    historyGrid.innerHTML = "";
    viewedProducts.forEach(product => {
        const card = document.createElement("div");
        card.className = "card";
        
        // Format the viewed time
        const viewedTime = new Date(product.viewedAt);
        const timeString = viewedTime.toLocaleDateString() + " " + viewedTime.toLocaleTimeString();
        
        card.innerHTML = `
            <img src="${product.thumbnail}" alt="${product.title}">
            <h4>${product.title}</h4>
            <p>₹ ${product.price}</p>
            <small style="color: #999; font-size: 12px;">Viewed: ${timeString}</small>
        `;
        
        card.addEventListener("click", () => {
            window.location.href = `productDetails.html?id=${product.id}`;
        });
        
        historyGrid.appendChild(card);
    });
}

// Clear history functionality
clearHistoryBtn.addEventListener("click", () => {
    if(confirm("Are you sure you want to clear all viewed products?")) {
        localStorage.removeItem("viewedProducts");
        displayViewHistory();
    }
});

// Display history on page load
displayViewHistory();

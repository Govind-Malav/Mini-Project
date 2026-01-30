let history = JSON.parse(localStorage.getItem("searchHistory")) || [];
const container = document.getElementById("historyList");

history.sort((a, b) => b.time - a.time);
history.forEach(item => {
    let div = document.createElement("div");
    div.className = "history-item";

    let date=new Date(item.time);
    let formattedTime = date.toLocaleString();
    console.log(formattedTime);
    console.log(date);
    div.innerHTML = `
    <strong>${item.query}</strong>
    <span class="time">${formattedTime}</span>
    `;
    console.log("div",div.innerHTML);
    // div.addEventListener("click", () => {
    //     window.location.href = `search.html?q=${encodeURIComponent(item.query)}`;
    // });
    console.log("container",container);
    div.addEventListener("click",()=>{
        window.location.href=`search.html?q=${encodedURIComponent(item.query)}`
    });
    container.appendChild(div);
});
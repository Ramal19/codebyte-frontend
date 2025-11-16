let booksList = document.querySelector(".book-list");
let searchBtn = document.getElementById("searchBtn");
let loaderCon = document.querySelector(".loader-con")
let searchInp = document.getElementById("searchInp");
let bookCard = document.querySelectorAll(".book-item")


function searchCard() {

    const query = searchInp.value.toLowerCase();

    bookCard.forEach(card => {
        const h3 = card.querySelector("h3");
        const text = h3.innerText.toLowerCase();

        if (text.includes(query)) {

            card.style.display = "flex";
        } else {
            card.style.display = "none";
        }
    });
}

searchBtn.addEventListener("click", () => {


    booksList.style.display = "none";
    loaderCon.style.display = "block";

    setTimeout(() => {
        loaderCon.style.display = "none";
        booksList.style.display = "flex";

        searchCard();
    }, 3000)
})

searchInp.addEventListener("input", () => {

    if (searchInp.value == "") {

        bookCard.forEach(element => {
            element.style.display = "flex";
        });
    }
})


let searchIcon = document.getElementById("search-icon");
let searchInpNavbar = document.getElementById("search-inp");


searchIcon.addEventListener("click", () => {


    if (searchInpNavbar.value.trim() !== "") {
        localStorage.setItem("searchValue", searchInpNavbar.value);
        window.location.href = "./search.html"
        console.log("Input bos deyil");

    }
})


const users = document.querySelector(".users")
const contacts = document.querySelector(".contacts")

users.addEventListener("click", () => {

    window.location.href = "./users.html"
})

contacts.addEventListener("click", () => {

    window.location.href = "./contacts-inbox.html"
})

const API_BASE_URL = "https://codebyte-backend-ibyq.onrender.com";
const USERS_API_URL = `${API_BASE_URL}/users`;


let allUsers = [];
let usersLength = document.getElementById("usersLength")

async function fetchUsers() {

    try {
        const response = await fetch(USERS_API_URL);

        if (!response.ok) {
            throw new Error(`HTTP xətası! Status: ${response.status}`);
        }

        allUsers = await response.json();

        usersLength.textContent = allUsers.length


    } catch (error) {
        console.error("Məlumat gətirilərkən xəta:", error);
    }
}

fetchUsers();

// Posts sayiii

let postsLength = document.getElementById("postsLength")

async function loadPosts() {
    try {
        const res = await fetch(`${API_BASE_URL}/posts`);
        const posts = await res.json();

        postsLength.textContent = posts.length;

    } catch (err) {
        console.error("Postlar yüklənərkən xəta:", err);
    }
}

loadPosts();
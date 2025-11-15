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
const CONTACTS_API_URL = `${API_BASE_URL}/api/contact`;
const READ_MESSAGES_KEY = 'readContacts'; 

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
        console.error("İstifadəçi məlumatları gətirilərkən xəta:", error);
    }
}

fetchUsers();

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


let unreadMessagesLength = document.querySelector(".contacts")

function isMessageRead(id) {
    const readMessages = JSON.parse(localStorage.getItem(READ_MESSAGES_KEY) || '[]');
    return readMessages.includes(id);
}

async function loadUnreadMessagesCount() {
    try {
        const res = await fetch(CONTACTS_API_URL);

        if (!res.ok) {
            throw new Error(`HTTP xətası! Status: ${res.status}`);
        }

        const contactsData = await res.json();

        const unreadCount = contactsData.filter(contact => {
            const isReadStatus = contact.isRead !== undefined
                ? contact.isRead
                : isMessageRead(contact.id);

            return !isReadStatus;
        }).length;

        if (unreadMessagesLength) {
            unreadMessagesLength.textContent = unreadCount;
        }


    } catch (err) {
        console.error("Oxunmamış mesajlar yüklənərkən xəta:", err);
        if (unreadMessagesLength) {
            unreadMessagesLength.textContent = "N/A";
        }
    }
}

loadUnreadMessagesCount();
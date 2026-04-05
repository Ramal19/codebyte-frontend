const API_URL = "https://codebyte-backend-ibyq.onrender.com";
const USERS_API_URL = `${API_URL}/users`;
const COURSES_API_URL = `${API_URL}/posts`;

const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");
const logo = document.querySelector(".logo");
const regPart = document.querySelector(".registration-part");
const navbar = document.querySelector(".navbar");
const aTags = document.querySelectorAll("li > a");

let allCourses = [];

const getActiveUser = () => JSON.parse(localStorage.getItem("loginUser") || localStorage.getItem("registeredUser"));

const redirectTo = (path) => {
    window.location.href = path;
};

function updateAuthUI() {
    const user = getActiveUser();
    if (user) {
        if (loginBtn) loginBtn.style.display = "none";
        if (registerBtn) registerBtn.style.display = "none";
        renderUserProfile(user);
    }
}

async function renderUserProfile(user) {
    const userInfo = document.createElement("div");
    userInfo.id = "userInfo";
    userInfo.innerHTML = `<div class="profil-img">${user.username[0].toUpperCase()}</div>`;
    regPart.appendChild(userInfo);

    const userDiv = document.createElement("div");
    userDiv.classList.add("user-div");
    userDiv.style.display = "none";

    let email = user.email || "E-poçt tapılmadı";

    userDiv.innerHTML = `
        <div class="user-item">
            <div class="profil-img large">${user.username[0].toUpperCase()}</div>
            <div>
                <h3>${user.username}</h3>
                <p>${email}</p>
            </div>
        </div>
        <button id="postAdd"><i class="bi bi-plus-square"></i> Kurs Paylaş</button>
        <button id="postManage"><i class="bi bi-view-list"></i> Ümumi Kurslar</button>
        <button id="logOut"><i class="bi bi-box-arrow-right"></i> Çıxış et</button>
    `;
    regPart.appendChild(userDiv);

    regPart.addEventListener("mouseenter", () => userDiv.style.display = "flex");
    regPart.addEventListener("mouseleave", () => userDiv.style.display = "none");

    document.getElementById("postAdd").onclick = () => redirectTo("../document/post-add.html");
    document.getElementById("postManage").onclick = () => redirectTo("../document/post-manage.html");
    document.getElementById("logOut").onclick = () => {
        localStorage.clear();
        window.location.reload();
    };
}

async function fetchAndRenderCourses() {
    const courseGrid = document.getElementById("course-grid");
    if (!courseGrid) return;

    try {
        const response = await fetch(COURSES_API_URL);
        allCourses = await response.json();
        renderData(allCourses);
    } catch (error) {
        console.error("Error:", error);
        courseGrid.innerHTML = "<p>Məlumat yüklənərkən xəta baş verdi.</p>";
    }
}

function renderData(data) {
    const courseGrid = document.getElementById("course-grid");
    if (!courseGrid) return;

    courseGrid.innerHTML = data.map(course => `
        <div class="course-card card shadow">
            <div class="course-img-container">
                <img src="${course.courseCover || course.image || 'https://placehold.co/600x400'}" alt="Course">
                <div class="price-badge">${course.price ? (course.price === 'pulsuz' ? 'Ödənişsiz' : course.price + ' ₼') : '0.00 ₼'}</div>
            </div>
            <div class="course-body">
                <div class="course-content-top">
                    <p class="course-meta">${(course.category || 'Ümumi').toUpperCase()} • ${course.username || 'Təlimçi'}</p>
                    <h3 class="course-title">${course.text || course.title || 'Başlıqsız'}</h3>
                </div>
                <div class="course-info">
                    <span><i class="bi bi-video"></i> ${course.videos ? course.videos.length : 0} Mövzu</span>
                    <span><i class="bi bi-people"></i> ${course.students || 0} Tələbə</span>
                </div>
            </div>
        </div>
    `).join('');
}

window.addEventListener("scroll", () => {
    if (!navbar) return;
    const isScrolled = window.scrollY >= 100;
    const isDeepScrolled = window.scrollY >= 300;

    navbar.style.marginTop = isScrolled ? "-80px" : "0";

    if (isDeepScrolled) {
        navbar.style.cssText = "margin-top: 0; background: #fff; color: #000; box-shadow: 0 2px 5px rgba(0,0,0,0.1); transition: 0.3s;";
        aTags.forEach(a => a.style.color = "#000");
    } else {
        navbar.style.backgroundColor = "transparent";
        aTags.forEach(a => a.style.color = "#fff");
    }
});

document.addEventListener("DOMContentLoaded", () => {
    updateAuthUI();
    fetchAndRenderCourses();

    if (logo) logo.onclick = () => redirectTo("../index.html");
    if (loginBtn) loginBtn.onclick = () => redirectTo("../document/login.html");
    if (registerBtn) registerBtn.onclick = () => redirectTo("../document/register.html");

    document.getElementById("searchInput")?.addEventListener("input", (e) => {
        const term = e.target.value.toLowerCase();
        const filtered = allCourses.filter(c =>
            (c.text || c.title || "").toLowerCase().includes(term) ||
            (c.category || "").toLowerCase().includes(term)
        );
        renderData(filtered);
    });

    document.getElementById("sortSelect")?.addEventListener("change", (e) => {
        let sorted = [...allCourses];
        const val = e.target.value;
        if (val === "az") sorted.sort((a, b) => (a.text || a.title || "").localeCompare(b.text || b.title || ""));
        if (val === "za") sorted.sort((a, b) => (b.text || b.title || "").localeCompare(a.text || a.title || ""));
        if (val === "low") sorted.sort((a, b) => (parseFloat(a.price) || 0) - (parseFloat(b.price) || 0));
        if (val === "high") sorted.sort((a, b) => (parseFloat(b.price) || 0) - (parseFloat(a.price) || 0));
        renderData(sorted);
    });

    const gridBtn = document.getElementById("gridView");
    const listBtn = document.getElementById("listView");
    const gridElement = document.getElementById("course-grid");

    gridBtn?.addEventListener("click", () => {
        gridElement.classList.replace("list-mode", "grid-mode");
        gridBtn.classList.add("active");
        listBtn.classList.remove("active");
    });

    listBtn?.addEventListener("click", () => {
        gridElement.classList.add("list-mode");
        gridElement.classList.remove("grid-mode");
        listBtn.classList.add("active");
        gridBtn.classList.remove("active");
    });
});
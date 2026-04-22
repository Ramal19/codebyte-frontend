let scrollBtn = document.getElementById("scrollBtn");
const exitBtn = document.getElementById("exitBtn")
const timerModal = document.querySelector(".timer-fade")
const locationCourse = document.getElementById("locationCourse")
const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");
const courseCard = document.querySelector(".course-card")
const regPart = document.querySelector(".registration-part")
const conAll = document.querySelector(".conAll")
const navbar = document.querySelector(".navbar")
const aTag = document.querySelectorAll("li>a")
const mouseClick = document.getElementById("mouseClick")
const webInfoSection = document.getElementById("webInfo")
const addBtn = document.querySelector(".add-btn");
const profileBtn = document.querySelector(".profile");

const API_URL = "https://codebyte-backend-ibyq.onrender.com";

const menuBtn = document.querySelector(".menu");
let menuDiv = null;
let profileDiv = null;

loginBtn.addEventListener("click", () => {
    console.log("Button calisir");
})

registerBtn.onclick = () => {
    console.log("Button calisir");
}

window.addEventListener("scroll", () => {
    if (window.scrollY <= 100) {
        scrollBtn.style.display = "none";
    } else {
        scrollBtn.style.display = "block"
    }

    if (window.scrollY >= 100) {
        navbar.style.cssText = `margin-top: -80px;`
    } else {
        navbar.style.cssText = `margin-top: 0;`
    }

    if (window.scrollY >= 300) {
        navbar.style.cssText = `margin-top: 0; margin-bottom: 0; background-color: #fff; color: #000; box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;`;
        aTag.forEach(e => {
            e.style.cssText = `color: #000`
        })
    } else {
        aTag.forEach(e => {
            e.style.cssText = `color: #fff`
        })
    }
})

mouseClick.addEventListener("click", () => {
    webInfoSection.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
})

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})

const img = document.querySelector('.tilt-img');
if (img) {
    img.addEventListener('mousemove', (e) => {
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        const moveX = (e.clientX - centerX) / 25;
        const moveY = (e.clientY - centerY) / 25;
        img.style.transform = `rotateX(${-moveY}deg) rotateY(${moveX}deg)`;
    });
    document.addEventListener('mouseleave', () => {
        img.style.transform = 'rotateX(0deg) rotateY(0deg)';
    });
}

let books = document.getElementById("booksHtmlSwitch");
if (books) {
    books.addEventListener("click", () => {
        window.location.href = "./document/books.html";
    })
}

let questionBox = document.querySelectorAll(".faq-card > h3");
let answerBox = document.querySelectorAll(".faq-card > p");

questionBox.forEach((element, index) => {
    element.addEventListener("click", () => {
        if (answerBox[index].style.display === "none") {
            answerBox[index].style.display = "block";
        } else {
            answerBox[index].style.display = "none";
        }
    });
});

answerBox.forEach((element) => {
    element.style.display = "none";
});

let heartIcon = document.querySelector(".bi-heart");
let cartIcon = document.querySelector(".bi-cart");
let notIcon = document.querySelector(".bi-bell");

if (notIcon) {
    notIcon.addEventListener("click", () => {
        window.location.href = "./document/notifications.html"
    })
}

if (heartIcon) {
    heartIcon.onclick = () => {
        window.location.href = "./document/wishlist.html"
    }
    heartIcon.addEventListener("mouseover", () => {
        heartIcon.classList.replace("bi-heart", "bi-heart-fill");
        heartIcon.style.cssText = "color: red; font-size: 24px;";
    })
    heartIcon.addEventListener("mouseout", () => {
        heartIcon.classList.replace("bi-heart-fill", "bi-heart");
        heartIcon.style.cssText = "color: #000; font-size: 24px;"
    })
}

if (cartIcon) {
    cartIcon.addEventListener("mouseover", () => {
        cartIcon.classList.replace("bi-cart", "bi-cart-fill");
        cartIcon.style.cssText = "font-size: 24px"
    })
    cartIcon.addEventListener("mouseout", () => {
        cartIcon.classList.replace("bi-cart-fill", "bi-cart");
    })
    cartIcon.addEventListener("click", () => {
        window.location.href = "./document/basket.html"
    })
}

if (addBtn) {
    addBtn.addEventListener("click", () => {
        window.location.href = "./document/post-add.html"
    })
}

const sectionForBubble = document.getElementById("sectionForBubble")
const bubbleCount = 5;
const bubbles = [];

if (sectionForBubble) {
    for (let i = 0; i < bubbleCount; i++) {
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        const size = Math.random() * 20 + 10;
        bubble.style.width = size + "px";
        bubble.style.height = size + "px";
        const x = Math.random() * (window.innerWidth - size);
        const y = Math.random() * (window.innerHeight - size);
        bubble.style.left = x + "px";
        bubble.style.top = y + "px";
        sectionForBubble.appendChild(bubble);
        bubbles.push({
            el: bubble,
            x,
            y,
            vx: (Math.random() - 0.5) * 0.8,
            vy: (Math.random() - 0.5) * 0.8,
            size
        });
    }

    function animate() {
        bubbles.forEach(b => {
            b.x += b.vx;
            b.y += b.vy;
            if (b.x <= 0 || b.x + b.size >= window.innerWidth) b.vx *= -1;
            if (b.y <= 0 || b.y + b.size >= window.innerHeight) b.vy *= -1;
            b.el.style.left = b.x + "px";
            b.el.style.top = b.y + "px";
        });
        requestAnimationFrame(animate);
    }
    animate();
}

const userData = localStorage.getItem("registeredUser");
const logData = localStorage.getItem("loginUser");
const USERS_API_URL = `${API_URL}/users`;

let allUsers = [];
let adminButtonCreated = false;

async function fetchUsers() {
    let currentUser = null;
    if (logData) {
        try {
            currentUser = JSON.parse(logData);
        } catch (e) {
            console.error(e);
        }
    } else if (userData) {
        try {
            currentUser = JSON.parse(userData);
        } catch (e) {
            console.error(e);
        }
    }

    if (currentUser && currentUser.role === "admin") {
        adminButtonCreated = true;
        return;
    }

    try {
        const response = await fetch(USERS_API_URL);
        if (!response.ok) throw new Error(response.status);
        allUsers = await response.json();
        const isAdmin = allUsers.some(el => {
            return (userData || logData) && el.username === currentUser?.username && el.role === "admin";
        });
        if (isAdmin) adminButtonCreated = true;
    } catch (error) {
        console.error(error);
    }
}
fetchUsers();

function closeProfile() {
    if (profileDiv) {
        profileDiv.classList.remove("active");
        setTimeout(() => {
            if (profileDiv && profileDiv.parentNode) document.body.removeChild(profileDiv);
            profileDiv = null;
            document.body.style.overflow = "auto";
        }, 400);
    }
}

function openProfile(user) {
    if (profileDiv) return;
    profileDiv = document.createElement("div");
    profileDiv.classList.add("profile-sidebar");
    profileDiv.innerHTML = `
        <div class="side-content">
            <span class="close-side" id="closeProfile"><i class="bi bi-x"></i></span>
            <div class="user-item-side">
                <div class="profil-img-big">${user.username[0]}</div>
                <h3>${user.username}</h3>
                <p>${user.email || ""}</p>
            </div>
            <hr>
            <button id="sidePostAdd"><i class="bi bi-plus-square"></i> Kurs Paylaş</button>
            <button id="sidePostManage"><i class="bi bi-view-list"></i> Ümumi Kurslar</button>
            <button id="sideGoProfile"><i class="bi bi-person"></i> Profil</button>
            <button id="sideLogOut" style="color:red"><i class="bi bi-box-arrow-right"></i> Çıxış et</button>
        </div>
    `;
    document.body.appendChild(profileDiv);
    setTimeout(() => profileDiv.classList.add("active"), 10);
    document.body.style.overflow = "hidden";

    document.getElementById("closeProfile").onclick = closeProfile;
    document.getElementById("sidePostAdd").onclick = () => window.location.href = "./document/post-add.html";
    document.getElementById("sidePostManage").onclick = () => window.location.href = "./document/post-manage.html";
    document.getElementById("sideGoProfile").onclick = () => window.location.href = "./document/profile.html";
    document.getElementById("sideLogOut").onclick = () => {
        localStorage.removeItem('loginUser');
        localStorage.removeItem('registeredUser');
        localStorage.removeItem('token');
        window.location.reload();
    };
}

if (profileBtn) {
    profileBtn.addEventListener("click", () => {
        const stored = userData || logData;
        if (stored) {
            const user = JSON.parse(stored);
            openProfile(user);
        } else {
            window.location.href = "./document/register.html";
        }
    });
}

if (userData || logData) {
    const user = JSON.parse(userData || logData);
    registerBtn.style.display = "none";
    loginBtn.style.display = "none";

    const userInfo = document.createElement("div");
    userInfo.id = "userInfo";
    userInfo.className = "profil-img";
    userInfo.innerHTML = user.username[0];
    regPart.appendChild(userInfo);

    userInfo.addEventListener("click", () => openProfile(user));
} else {
    registerBtn.addEventListener("click", () => window.location.href = "./document/register.html");
    loginBtn.addEventListener("click", () => window.location.href = "./document/login.html");
}

function closeMenu() {
    if (menuDiv) {
        menuDiv.classList.remove("active");
        setTimeout(() => {
            if (menuDiv && menuDiv.parentNode) document.body.removeChild(menuDiv);
            menuDiv = null;
            document.body.style.overflow = "auto";
        }, 400);
    }
}

menuBtn.addEventListener("click", () => {
    if (menuDiv) return;
    menuDiv = document.createElement("div");
    menuDiv.classList.add("menu-sidebar");

    let adminBtnHtml = adminButtonCreated ? `<button id="sideAdmin"><i class="bi bi-shield-lock"></i> Admin Panel</button>` : "";

    menuDiv.innerHTML = `
        <div class="side-content">
            <span class="close-side" id="closeMenuSide"><i class="bi bi-x"></i></span>
            <button onclick="window.location.href='index.html'"><i class="bi bi-house"></i> Ana Səhifə</button>
            <button onclick="window.location.href='./document/contact.html'"><i class="bi bi-chat-left-text"></i> Əlaqə</button>
            ${adminBtnHtml}
            ${(!userData && !logData) ? `
                <button onclick="window.location.href='./document/login.html'">Daxil olun</button>
                <button onclick="window.location.href='./document/register.html'">Qeydiyyat</button>
            ` : ""}
        </div>
    `;
    document.body.appendChild(menuDiv);
    setTimeout(() => menuDiv.classList.add("active"), 10);
    document.body.style.overflow = "hidden";

    document.getElementById("closeMenuSide").onclick = closeMenu;
    if (adminButtonCreated) {
        document.getElementById("sideAdmin").onclick = () => window.location.href = "./admin-dashboard/documents/a1d2m3i4n5P1a2n3e4l5.html";
    }
});

const postsDiv = document.getElementById("posts");
const searchInp = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");

if (searchIcon) {
    searchIcon.addEventListener("click", () => {
        const val = searchInp.value.trim();
        if (val !== "") {
            localStorage.setItem("searchValue", val);
            window.location.href = "./document/search.html";
        }
    });
}

async function getCourseRating(courseId) {
    try {
        const ratingRes = await fetch(`${API_URL}/course-rating/${courseId}`);
        if (ratingRes.ok) return await ratingRes.json();
    } catch (error) {
        console.warn(error);
    }
    return { averageRating: 0.0, count: 0 };
}

async function addToWishlist(postId) {
    const token = localStorage.getItem("token");
    if (!token) return alert("Zəhmət olmasa daxil olun!");
    try {
        const res = await fetch(`${API_URL}/wishlist/${postId}`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        alert(data.message || "İstək siyahısı yeniləndi");
    } catch (err) { console.error(err); }
}

async function addToBasket(postId) {
    const token = localStorage.getItem("token");
    if (!token) return alert("Zəhmət olmasa daxil olun!");
    try {
        const res = await fetch(`${API_URL}/basket/${postId}`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
        });
        const data = await res.json();
        alert(data.message || "Kurs səbətə əlavə olundu");
    } catch (err) { console.error(err); }
}

function createPostElement(p) {
    const div = document.createElement("div");
    div.classList.add("lesson-card", "card", "shadow");
    const videoCount = p.videos ? p.videos.length : 0;
    const tarix = p.createdAt ? p.createdAt.slice(0, 10).split("-").reverse().join("-") : "---";
    const price = p.price || "pulsuz";
    let titleText = p.text || "";
    let paddingBottom = "30px";
    if (titleText.length > 38) paddingBottom = "15px";
    if (titleText.length > 79) titleText = titleText.slice(0, 76) + "...";

    const ratingHTML = `
        <div class="course-rating" style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
            <span style="color: #C4710D; font-size: 18px;">★</span>
            <span class="course-point" style="font-weight: bold; font-size: 14px;">${(p.rating?.averageRating || 0).toFixed(1)}</span>
            <span style="color: gray; font-size: 12px;">(${p.rating?.count || 0})</span>
        </div>`;

    div.innerHTML = `
        <img src="${p.courseCover}" alt="Post şəkli">
        <div class="free">Ödənişsiz</div>        
        <div class="card-text">
            <div class="name-type">
                <h3 style="font-size: 15px; font-weight: 600;">${p.category}</h3>
                <span style="width: 5px; height: 5px; border-radius: 9999px; background-color: lightgray;"></span>
                <span id="instructor-name">${p.username}</span>
            </div>
            <h3 class="course-title" style="padding-bottom: ${paddingBottom};">${titleText}</h3>
            <div class="card-content">
                ${ratingHTML} 
                <div class="card-meta" style="font-size: 13px; color: #666; margin: 5px 0;">
                    <span><i class="fas fa-video"></i> ${videoCount} Mövzu</span> | 
                    <span>${tarix}</span>
                </div>
                <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 10px;">
                    <span class="price" style="font-weight: bold; color: #a435f0;">${price === "pulsuz" ? "Ödənişsiz" : `${price} ₼`}</span>
                    <div class="card-btns" style="display: flex; gap: 5px;">
                        <button class="wish-btn" title="İstək siyahısı" style="background: white; border: 1px solid #ddd; padding: 5px 8px; border-radius: 4px; cursor: pointer;">
                            <i class="bi bi-heart" style="color: #a435f0;"></i>
                        </button>
                        <button class="basket-btn" title="Səbətə at" style="background: #a435f0; color: white; border: none; padding: 5px 10px; border-radius: 4px; cursor: pointer;">
                            <i class="bi bi-cart2"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>`;

    div.addEventListener("click", (e) => {
        if (e.target.closest('.wish-btn')) {
            addToWishlist(p.id);
            return;
        }
        if (e.target.closest('.basket-btn')) {
            addToBasket(p.id);
            return;
        }
        if (userData || logData) {
            localStorage.setItem("selectedPost", JSON.stringify(p));
            window.location.href = "./document/video.html";
        } else {
            alert("Zəhmət olmasa daxil olun!");
        }
    });
    return div;
}

async function loadPosts() {
    if (!postsDiv) return;
    try {
        const res = await fetch(`${API_URL}/posts`);
        let posts = await res.json();
        if (!posts || posts.length === 0) {
            postsDiv.innerHTML = '<p style="text-align:center; padding:30px; color:gray;">Hazırda heç bir kurs yoxdur.</p>';
            return;
        }
        const postsWithRatings = await Promise.all(
            posts.map(async p => {
                const rating = await getCourseRating(p.id);
                return { ...p, rating };
            })
        );
        postsWithRatings.sort((a, b) => b.rating.averageRating - a.rating.averageRating);
        const topSixPosts = postsWithRatings.slice(0, 8);
        postsDiv.innerHTML = "";
        topSixPosts.forEach(p => {
            postsDiv.appendChild(createPostElement(p));
        });
    } catch (err) {
        console.error(err);
    }
}
loadPosts();

const counters = document.querySelectorAll('.counter');
const speed = 100;
counters.forEach(counter => {
    const updateCount = () => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const inc = target / speed;
        if (count < target) {
            counter.innerText = Math.ceil(count + inc);
            setTimeout(updateCount, 1);
        } else {
            counter.innerText = target + "+";
        }
    };
    updateCount();
});

function toggleAcc(element) {
    if (element.classList.contains('active')) return;
    const allItems = document.querySelectorAll('.acc-item');
    allItems.forEach(item => { item.classList.remove('active'); });
    element.classList.add('active');
}
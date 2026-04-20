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

const API_URL = "https://codebyte-backend-ibyq.onrender.com";

const menuBtn = document.querySelector(".menu");
let menuDiv = null;

loginBtn.addEventListener("click", () => {

    console.log("Button calisir");

})

registerBtn.onclick = () => {
    // window.location.href = "frontend/document/register.html"
    console.log("Button calisir");

}

window.addEventListener("scroll", () => {
    if (window.scrollY <= 100) {
        scrollBtn.style.display = "none";
    } else {
        scrollBtn.style.display = "block"
    }

    if (window.scrollY >= 100) {
        // console.log("Scroll calisir ve veziyyeti 100 ve ya 100den boyukdur");
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

img.addEventListener('mousemove', (e) => {
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    const moveX = (e.clientX - centerX) / 25;
    const moveY = (e.clientY - centerY) / 25;

    img.style.transform = `
        rotateX(${-moveY}deg)
        rotateY(${moveX}deg)
      `;
});

document.addEventListener('mouseleave', () => {
    img.style.transform = 'rotateX(0deg) rotateY(0deg)';
});

let books = document.getElementById("booksHtmlSwitch");

books.addEventListener("click", () => {
    window.location.href = "./document/books.html";
})

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

notIcon.addEventListener("click", () => {

    window.location.href = "./document/notifications.html"
})

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

cartIcon.addEventListener("mouseover", () => {

    cartIcon.classList.replace("bi-cart", "bi-cart-fill");
    cartIcon.style.cssText = "font-size: 24px"
})

cartIcon.addEventListener("mouseout", () => {

    cartIcon.classList.replace("bi-cart-fill", "bi-cart");
})

cartIcon.addEventListener("click", ()=>{

    window.location.href = "./document/basket.html"
})

const sectionForBubble = document.getElementById("sectionForBubble")
const bubbleCount = 5;
const bubbles = [];

for (let i = 0; i < bubbleCount; i++) {
    const bubble = document.createElement("div");
    bubble.className = "bubble";

    const size = Math.random() * 20 + 10; // 10–30px
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
            console.error("Local Storage-da loginUser JSON formatında deyil:", e);
        }
    } else if (userData) {
        try {
            currentUser = JSON.parse(userData);
        } catch (e) {
            console.error("Local Storage-da registeredUser JSON formatında deyil:", e);
        }
    }

    if (currentUser && currentUser.role === "admin") {

        if (!adminButtonCreated) {

            let button = document.createElement("button");
            button.textContent = "Location";

            button.addEventListener("click", () => {
                window.location.href = "./admin-dashboard/documents/a1d2m3i4n5P1a2n3e4l5.html";
            });

            if (regPart) {
                regPart.appendChild(button);
                adminButtonCreated = true;
            }
        }
        return;
    }

    try {
        const response = await fetch(USERS_API_URL);

        if (!response.ok) {
            throw new Error(`HTTP xətası! Status: ${response.status}`);
        }

        allUsers = await response.json();



        const isAdmin = allUsers.some(el => {
            return (userData || logData) && el.username === currentUser?.username && el.role === "admin";
        });

        if (isAdmin && !adminButtonCreated) {
            let button = document.createElement("button");
            button.textContent = "Location";

            button.addEventListener("click", () => {
                window.location.href = "./admin-dashboard/documents/a1d2m3i4n5P1a2n3e4l5.html";
            });

            if (regPart) {
                regPart.appendChild(button);
                adminButtonCreated = true;
            }
        }

    } catch (error) {
        console.error("İstifadəçi məlumatları gətirilərkən xəta:", error);
    }
}

fetchUsers();


if (userData) {

    const user = JSON.parse(userData);

    registerBtn.style.display = "none";
    loginBtn.style.display = "none";
    const userInfo = document.createElement("div");


    userInfo.id = "userInfo";
    userInfo.innerHTML =
        `
        <div class="profil-img">
        </div>
    `


    regPart.appendChild(userInfo)

    let userDiv = document.createElement("div");
    userDiv.classList.add("user-div");
    userDiv.innerHTML =
        `
        <div class="user-item">
            <div class="profil-img">
            </div>
            <div>
                <h3>${user.username}</h3>
                <p>${user.email}</p>
            </div>
        </div>
        <button id="postAdd"><i class="bi bi-plus-square"></i> Kurs Paylaş</button>
        <button id="postManage"><i class="bi bi-view-list"></i> Ümumi Kurslar</button>
        <button id="logOut"><i class="bi bi-box-arrow-right"></i> Çıxış et</button>
    `

    regPart.appendChild(userDiv);

    const postAdd = document.getElementById("postAdd");
    const postManage = document.createElement("postManage");


    postAdd.addEventListener("click", () => {

        window.location.href = "./document/post-add.html"
    })

    postManage.addEventListener("click", () => {

        window.location.href = "./document/post-manage.html"
    })

    const profilImg = document.querySelectorAll(".profil-img")

    profilImg.forEach((el, index) => {
        el.innerHTML = user.username[0];

        if (index === 1) {
            el.style.cssText = `width: 64px; height: 64px; font-size: 28px;`
        }
    })
    regPart.addEventListener("mouseover", () => {
        userDiv.style.display = "flex"
    })

    regPart.addEventListener("mouseout", () => {
        userDiv.style.display = "none"

    });

    userDiv.addEventListener("mouseover", () => {
        userDiv.style.display = "flex"
    })

    userDiv.addEventListener("mouseout", () => {
        userDiv.style.display = "none"

    });

    const logOut = document.getElementById("logOut");

    logOut.addEventListener("click", () => {

        localStorage.removeItem('registeredUser');
        window.location.reload();
        userDiv.style.display = "none";
    })
} else {
    registerBtn.addEventListener("click", () => {
        window.location.href = "./document/register.html";
    });
    loginBtn.addEventListener("click", () => {
        window.location.href = "./document/login.html";

    })
}

let nav = null;


if (logData) {

    const user = JSON.parse(logData);

    const navbar = document.querySelector(".container");
    const menu = document.getElementById("scrollBtn");

    const currentUser = user.username || "E-poct tapilmadi!";

    registerBtn.style.display = "none";
    loginBtn.style.display = "none";
    const userInfo = document.createElement("div");

    userInfo.id = "userInfo";
    userInfo.innerHTML =
        `
        <div class="profil-img">
        </div>
    `

    regPart.appendChild(userInfo)

    let allUsers = [];
    let userMail = null;
    const token = localStorage.getItem("token");

    async function fetchUsers() {
        if (!token) {
            console.error("İstifadəçi məlumatları gətirilə bilmədi: Autentifikasiya tokeni tapılmadı.");
            return;
        }

        try {
            const response = await fetch(USERS_API_URL, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });


            if (!response.ok) {
                if (response.status === 401) {
                    console.error("401 Unauthorized: Token etibarsızdır və ya müddəti bitib.");
                }
                throw new Error(`HTTP xətası! Status: ${response.status}`);
            }

            allUsers = await response.json();

            allUsers.forEach(el => {


                if (logData) {
                    if (el.username === currentUser) {
                        userMail = el.email
                    }
                }

            })

        } catch (error) {
            console.error("İstifadəçi məlumatları gətirilərkən xəta:", error);
        }
    }

    fetchUsers();

    let userDiv = document.createElement("div");
    userDiv.classList.add("user-div");
    userDiv.innerHTML =
        `
        <div class="user-item">
            <div class="profil-img">
            </div>
            <div>
                <h3>${user.username}</h3>
                <p>${userMail}</p>
            </div>
        </div>
        <button id="postAdd"><i class="bi bi-plus-square"></i> Kurs Paylaş</button>
        <button id="postManage"><i class="bi bi-view-list"></i> Ümumi Kurslar</button>
        <button id="goToProfile"><i class="bi bi-person"></i> Profil</button>
        <button id="logOut"><i class="bi bi-box-arrow-right"></i> Çıxış et</button>
    `

    regPart.appendChild(userDiv);

    const postAdd = document.getElementById("postAdd");
    const postManage = document.createElement("postManage");
    const goToProfile = document.getElementById("goToProfile");


    postAdd.addEventListener("click", () => {

        window.location.href = "./document/post-add.html"
    })

    postManage.addEventListener("click", () => {

        window.location.href = "./document/post-manage.html"
    })

    goToProfile.addEventListener("click", () => {

        window.location.href = "./document/profile.html";
    })

    const profilImg = document.querySelectorAll(".profil-img")

    profilImg.forEach((el, index) => {
        el.innerHTML = user.username[0];

        if (index === 1) {
            el.style.cssText = `width: 64px; height: 64px; font-size: 28px;`
        }
    })
    regPart.addEventListener("mouseover", () => {
        userDiv.style.display = "flex"
    })

    regPart.addEventListener("mouseout", () => {
        userDiv.style.display = "none"

    });

    userDiv.addEventListener("mouseover", () => {
        userDiv.style.display = "flex"
    })

    userDiv.addEventListener("mouseout", () => {
        userDiv.style.display = "none"

    });

    const logOut = document.getElementById("logOut");

    logOut.addEventListener("click", () => {

        localStorage.removeItem('loginUser');
        localStorage.removeItem('token');
        window.location.reload();
        userDiv.style.display = "none";
    })
} else {
    registerBtn.addEventListener("click", () => {
        window.location.href = "./document/register.html";
    });
    loginBtn.addEventListener("click", () => {
        window.location.href = "./document/login.html";

    })
}

let adminBtn = "null";

menuBtn.addEventListener("click", () => {

    if (menuDiv === null) {

        if (adminButtonCreated) {

            adminBtn = `<button class="toLocation"> Admin</button>`;

        } else {

            console.log("admin deyilsiniz");
        }

        menuDiv = document.createElement("div");

        menuDiv.classList.add("menu-div");
        menuDiv.classList.add("forClose")

        menuDiv.innerHTML =
            `
            <div class="menu-item">
                <span id="closeMenu" class="forClose"><i class="bi bi-x"></i></span>
                <button id="loginWithMenu">Daxil olun</button>
                <button id="regWithMenu">Qeydiyyat</button>
                <button id="toContact"><i class="bi bi-chat-left-text"></i> Əlaqə</button>
                ${adminBtn}
            </div>
        `

        document.body.style.cssText = `overflow: hidden;`

        document.body.appendChild(menuDiv);

        let closeBtnMenu = document.querySelectorAll(".forClose");

        closeBtnMenu.forEach(btn => {

            btn.addEventListener("click", () => {

                document.body.removeChild(menuDiv)
                menuDiv = null
                document.body.style.cssText = `overflow: scroll;`

            })
        })

        let loginWithMenu = document.getElementById("loginWithMenu");
        let regWithMenu = document.getElementById("regWithMenu");
        let toContact = document.getElementById("toContact")

        loginWithMenu.addEventListener("click", () => {

            window.location.href = "./document/login.html"
        })


        regWithMenu.addEventListener("click", () => {

            window.location.href = "./document/register.html"
        })

        toContact.addEventListener("click", () => {

            window.location.href = "./document/contact.html"
        })

        if (logData) {

            const user = JSON.parse(logData);


            loginWithMenu.style.display = "none";
            regWithMenu.style.display = "none";

            let shortUsername;

            if (user.username.length > 15) {
                shortUsername = user.username.slice(0, 15) + "...";

            } else {

                shortUsername = user.username;
            }

            menuDiv.innerHTML =
                `
            <div class="menu-item">
                <span id="closeMenu" class="forClose"><i class="bi bi-x"></i></span>
                <div class="user-info-menu">
                    <div class="profil-img-menu">
                        ${user.username[0]}
                    </div>
                    <div>
                        <h3>${shortUsername}</h3>
                        <p>${user.email}</p>
                    </div>
                </div>
                <button id="postAddMenu"><i class="bi bi-plus-square"></i> Kurs Paylaş</button>
                <button id="postManageMenu"><i class="bi bi-view-list"></i> Ümumi Kurslar</button>
                <button id="logOutMenu"><i class="bi bi-box-arrow-right"></i> Çıxış et</button>
                <button id="toContact"><i class="bi bi-chat-left-text"></i> Əlaqə</button>
                ${adminBtn}

            </div>
        `

            const logOutMenu = document.getElementById("logOutMenu");

            logOutMenu.addEventListener("click", () => {

                localStorage.removeItem('loginUser');
                window.location.reload();
            })

            const postAddMenu = document.getElementById("postAddMenu");


            postAddMenu.addEventListener("click", () => {

                window.location.href = "./document/post-add.html";
            })

            toContact.addEventListener("click", () => {

                window.location.href = "./document/contact.html"
            })

            let location = document.querySelector(".toLocation")
            location.addEventListener("click", () => {
                window.location.href = "./admin-dashboard/documents/users.html"
            })
        }

        if (userData) {
            const user = JSON.parse(userData);


            loginWithMenu.style.display = "none";
            regWithMenu.style.display = "none";

            menuDiv.innerHTML =
                `
            <div class="menu-item">
                <span id="closeMenu" class="forClose"><i class="bi bi-x"></i></span>
                <div class="user-info-menu">
                    <div class="profil-img-menu">
                        ${user.username[0]}
                    </div>
                    <div>
                        <h3>${user.username}</h3>
                        <p>${user.email}</p>
                    </div>
                </div>
                <button id="postAddMenu"><i class="bi bi-plus-square"></i> Kurs Paylaş</button>
                <button id="postManageMenu"><i class="bi bi-view-list"></i> Ümumi Kurslar</button>
                <button id="logOutMenu"><i class="bi bi-box-arrow-right"></i> Çıxış et</button>
            </div>
        `

            const logOutMenu = document.getElementById("logOutMenu");

            logOutMenu.addEventListener("click", () => {

                localStorage.removeItem('registeredUser');
                window.location.reload();
            })

            const postAddMenu = document.getElementById("postAddMenu");


            postAddMenu.addEventListener("click", () => {

                window.location.href = "./document/post-add.html";
            })
        }

    } else {

        document.body.removeChild(menuDiv)
        menuDiv = null
    }
})

// const postsDiv = document.getElementById("posts");
// const searchInp = document.getElementById("search-input");
// const searchIcon = document.getElementById("search-icon");

// if (searchIcon && !searchIcon._hasListener) {
//     searchIcon.addEventListener("click", () => {
//         const val = searchInp.value.trim();
//         if (val !== "") {
//             localStorage.setItem("searchValue", val);
//             window.location.href = "./document/search.html";
//         }
//     });
//     searchIcon._hasListener = true;
// }

// async function getCourseRating(courseId) {
//     try {
//         const ratingRes = await fetch(`${API_URL}/course-rating/${courseId}`);
//         if (ratingRes.ok) return await ratingRes.json();
//     } catch (error) {
//         console.warn(`Error (${courseId}):`, error);
//     }
//     return { averageRating: 0.0, count: 0 };
// }

// function createPostElement(p) {
//     const div = document.createElement("div");
//     div.classList.add("lesson-card", "card", "shadow");

//     const videoCount = p.videos ? p.videos.length : 0;
//     const tarix = p.createdAt.slice(0, 10).split("-").reverse().join("-");
//     const price = p.price || "pulsuz";

//     let titleText = p.text || "";
//     let paddingBottom = "30px";

//     if (titleText.length > 38) {
//         paddingBottom = "15px";
//     }
//     if (titleText.length > 79) {
//         titleText = titleText.slice(0, 76) + "...";
//     }

//     const ratingHTML = `
//         <div class="course-rating" style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
//             <span style="color: #C4710D; font-size: 18px;">★</span>
//             <span class="course-point" style="font-weight: bold; font-size: 14px;">${(p.rating?.averageRating || 0).toFixed(1)}</span>
//             <span style="color: gray; font-size: 12px;">(${p.rating?.count || 0})</span>
//         </div>`;

//     div.innerHTML = `
//         <img src="${p.courseCover}" alt="Post şəkli">
//         <div class="free">Ödənişsiz</div>             
//         <div class="card-text">
//             <div class="name-type">
//                 <h3 style="font-size: 15px; font-weight: 600;">${p.category}</h3>
//                 <span style="width: 5px; height: 5px; border-radius: 9999px; background-color: lightgray;"></span>
//                 <span id="instructor-name">${p.username}</span>
//             </div>
//             <h3 class="course-title" style="padding-bottom: ${paddingBottom};">${titleText}</h3>
//             <div class="card-content">
//                 ${ratingHTML} 
//                 <div class="card-meta" style="font-size: 13px; color: #666; margin: 5px 0;">
//                     <span><i class="fas fa-video"></i> ${videoCount} Mövzu</span> | 
//                     <span>${tarix}</span>
//                 </div>
//                 <span class="price">${price === "pulsuz" ? "Ödənişsiz" : `${price} ₼`}</span>
//             </div>
//         </div>`;

//     div.addEventListener("click", (e) => {
//         if (e.target.classList.contains('wish-btn')) return;

//         if (typeof userData !== 'undefined' || typeof logData !== 'undefined') {
//             localStorage.setItem("selectedPost", JSON.stringify(p));
//             window.location.href = "./document/video.html";
//         } else {
//             if (typeof showLoginModal === "function") {
//                 showLoginModal(p);
//             } else {
//                 alert("Zəhmət olmasa daxil olun!");
//             }
//         }
//     });

//     return div;
// }

// async function loadPosts() {
//     try {
//         const res = await fetch(`${API_URL}/posts`);
//         let posts = await res.json();

//         if (!posts || posts.length === 0) {
//             postsDiv.innerHTML = '<p style="text-align:center; padding:30px; color:gray;">Hazırda heç bir kurs yoxdur.</p>';
//             return;
//         }

//         const postsWithRatings = await Promise.all(
//             posts.map(async p => {
//                 const rating = await getCourseRating(p.id);
//                 return { ...p, rating };
//             })
//         );

//         postsWithRatings.sort((a, b) => b.rating.averageRating - a.rating.averageRating);

//         const topSixPosts = postsWithRatings.slice(0, 8);

//         postsDiv.innerHTML = "";
//         topSixPosts.forEach(p => {
//             postsDiv.appendChild(createPostElement(p));
//         });

//     } catch (err) {
//         console.error("Postlar yüklənərkən xəta:", err);
//     }
// }

// loadPosts();



// const counters = document.querySelectorAll('.counter');
// const speed = 100;

// counters.forEach(counter => {
//     const updateCount = () => {
//         const target = +counter.getAttribute('data-target');
//         const count = +counter.innerText;

//         const inc = target / speed;

//         if (count < target) {
//             counter.innerText = Math.ceil(count + inc);
//             setTimeout(updateCount, 1);
//         } else {
//             counter.innerText = target + "+";
//         }
//     };

//     updateCount();
// });

// function toggleAcc(element) {
//     if (element.classList.contains('active')) return;

//     const allItems = document.querySelectorAll('.acc-item');
//     allItems.forEach(item => {
//         item.classList.remove('active');
//     });

//     element.classList.add('active');
// }

const postsDiv = document.getElementById("posts");
const searchInp = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");

// API_URL-in yuxarıda təyin olunduğunu fərz edirik (https://codebyte-backend-ibyq.onrender.com)

if (searchIcon && !searchIcon._hasListener) {
    searchIcon.addEventListener("click", () => {
        const val = searchInp.value.trim();
        if (val !== "") {
            localStorage.setItem("searchValue", val);
            window.location.href = "./document/search.html";
        }
    });
    searchIcon._hasListener = true;
}

async function getCourseRating(courseId) {
    try {
        const ratingRes = await fetch(`${API_URL}/course-rating/${courseId}`);
        if (ratingRes.ok) return await ratingRes.json();
    } catch (error) {
        console.warn(`Error (${courseId}):`, error);
    }
    return { averageRating: 0.0, count: 0 };
}

// --- YENİ: SƏBƏT VƏ WISH-LIST FUNKSIYALARI ---
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
// ${price === "pulsuz" ? "Ödənişsiz" : "Kurs"}
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
        // Əgər istifadəçi düymələrə klikləyibsə, video səhifəsinə keçmə
        if (e.target.closest('.wish-btn')) {
            addToWishlist(p.id);
            return;
        }
        if (e.target.closest('.basket-btn')) {
            addToBasket(p.id);
            return;
        }

        if (typeof userData !== 'undefined' || typeof logData !== 'undefined') {
            localStorage.setItem("selectedPost", JSON.stringify(p));
            window.location.href = "./document/video.html";
        } else {
            if (typeof showLoginModal === "function") {
                showLoginModal(p);
            } else {
                alert("Zəhmət olmasa daxil olun!");
            }
        }
    });

    return div;
}

async function loadPosts() {
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
        console.error("Postlar yüklənərkən xəta:", err);
    }
}

loadPosts();

// Counter və Accordion hissələri dəyişilmədən qalır...
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
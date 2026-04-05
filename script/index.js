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

    // if (nav === null) {

    //     nav = document.createElement("div");
    //     navbar.appendChild(nav);
    //     navbar.insertBefore(nav, menu);

    //     nav.innerHTML =
    //         `
    //         <div class="profil-img"></div>
    //         <div class="username">
    //             ${user.username}
    //         </div>
    //     `

    //     nav.style.cssText =
    //         `
    //         position: absolute;
    //         top: 50px;
    //         z-index: 10000;
    //     `
    // }


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
// const btnDirection = document.querySelector(".btn-direction");
// const searchInp = document.getElementById("search-input");

// const searchIcon = document.getElementById("search-icon");

// if (searchIcon && !searchIcon._hasListener) {
//     searchIcon.addEventListener("click", () => {
//         if (searchInp.value.trim() !== "") {
//             localStorage.setItem("searchValue", searchInp.value);
//             window.location.href = "./document/search.html"
//         }
//     })
//     searchIcon._hasListener = true;
// }
// const renderStars = (score) => {
//     const roundedScore = Math.round(score);
//     let stars = '';
//     for (let i = 1; i <= 5; i++) {
//         const color = i <= roundedScore ? '#C4710D' : 'lightgray';
//         stars += `<span style="color: ${color}; font-size: 18px;">★</span>`;
//     }
//     return stars;
// };

// async function getCourseRating(courseId) {
//     try {
//         const ratingRes = await fetch(`${API_URL}/course-rating/${courseId}`);
//         if (ratingRes.ok) {
//             return await ratingRes.json();
//         }
//     } catch (error) {
//         console.warn(`Reytinq yüklənərkən xəta (${courseId}):`, error);
//     }
//     return { averageRating: 0.0, count: 0 };
// }


// async function loadPosts() {
//     try {
//         const res = await fetch(`${API_URL}/posts`);
//         const posts = await res.json();

//         if (!posts || posts.length === 0) {
//             postsDiv.innerHTML = `
//             <p 
//                 style="
//                     font-size: 20px; 
//                     color: gray; 
//                     text-align: center;
//                     padding: 30px 0;
//             ">
//                 Hazırda heç bir kurs yoxdur.
//             </p>`;
//             return;
//         }

//         postsDiv.innerHTML = "";

//         const reversedPosts = posts.reverse();
//         const postPromises = reversedPosts.map(async p => {
//             const rating = await getCourseRating(p.id);
//             return { ...p, rating };
//         });

//         const postsWithRatings = await Promise.all(postPromises);


//         postsWithRatings.forEach(p => {
//             const div = document.createElement("div");
//             div.classList.add("lesson-card")

//             let tarix = p.createdAt.slice(0, 10);
//             let tersTarix = tarix.split("-").reverse().join("-");

//             const ratingHTML = `
//                 <div class="course-rating" style="display: flex; align-items: center; gap: 5px; margin-bottom: 5px;">
//                     <span class="course-point">${p.rating.averageRating.toFixed(1)}</span>
//                     <span style="font-weight: bold; font-size: 14px;">${renderStars(p.rating.averageRating)}</span>
//                     <span style="color: gray; font-size: 12px;">
//                         (${p.rating.count})
//                     </span>
//                 </div>
//             `;

//             let price = p.price || "pulsuz"

//             div.innerHTML = `
//                 <img src="${p.courseCover}" alt="Post şəkli">                 
//                 <div class="card-text">
//                     <h3>${p.text || ""}</h3>
//                     <span id="instructor-name">${p.username}</span>
//                     ${ratingHTML}
//                     <span>${tersTarix}</span>
//                     <span class="price">Ödənişsiz <span class="free">${price} AZN</span></span>
//                 </div>
//           `;
//             //                     <button class="wish-btn" data-id="${p.id}">❤️ Wishlistə əlavə et</button>

//             let logForm = null;

//             div.addEventListener("click", () => {
//                 if (userData || logData) {
//                     localStorage.setItem("selectedPost", JSON.stringify(p));
//                     window.location.href = "./document/video.html";
//                 } else {
//                     if (logForm === null) {
//                         logForm = document.createElement("div");
//                         logForm.classList.add("logform-blurDiv");

//                         logForm.innerHTML =
//                             `
//                         <div class="container-logForm">
//                             <div class="content">
//                             <img src="./image/CodeByte.png"/>
//                               <form id="loginForm" class="content__form">
//                                 <div class="content__inputs">
//                                   <label>
//                                     <input class="input" name="username" type="text" id="username-inp" required="">
//                                     <span>Username</span>
//                                   </label>
//                                   <label>
//                                     <input required="" class="input" name="password" type="password" id="password-inp">
//                                     <span>Password</span>
//                                   </label>
//                                 </div>
//                                 <button>Daxil ol</button>
//                               </form>
//                               <div class="content__or-text">
//                                 <span></span>
//                                 <span>Və ya</span>
//                                 <span></span>
//                               </div>
//                               <div class="content__forgot-buttons">
//                                 
//                                 <button class="exit-logForm">Cancel</button>
//                               </div>
//                             </div>
//                         </div>
//                         `
//                         document.body.style.overflow = "hidden";

//                         document.body.appendChild(logForm)

//                         let exitLogForm = document.querySelector(".exit-logForm");

//                         exitLogForm.addEventListener("click", () => {
//                             document.body.removeChild(logForm)
//                             logForm = null
//                             document.body.style.overflow = "auto";
//                         })

//                         const form = document.getElementById("loginForm");
//                         form.addEventListener("submit", async (e) => {
//                             e.preventDefault();

//                             localStorage.setItem("selectedPost", JSON.stringify(p));

//                             const data = {
//                                 username: form.username.value,
//                                 password: form.password.value
//                             };
//                             const res = await fetch(`${API_URL}/login`, {
//                                 method: "POST",
//                                 headers: { "Content-Type": "application/json" },
//                                 body: JSON.stringify(data)
//                             });
//                             const json = await res.json();
//                             if (res.ok) {
//                                 localStorage.setItem("token", json.token);
//                                 localStorage.setItem("loginUser", JSON.stringify({
//                                     username: data.username,
//                                 }));

//                                 Swal.fire({
//                                     title: "Giriş uğurludur!",
//                                     icon: "success",
//                                 }).then(() => {
//                                     window.location.href = "./document/video.html";
//                                 });

//                             } else {
//                                 alert(json.message)
//                             }
//                         });

//                     }

//                 }
//             });

//             postsDiv.appendChild(div);

//             const wishBtn = div.querySelector(".wish-btn");
//             wishBtn.addEventListener("click", async (e) => {
//                 e.stopPropagation();
//                 const postId = wishBtn.dataset.id;
//                 const token = localStorage.getItem("token");

//                 if (!token || !logData) {
//                     alert("Əvvəlcə daxil olmalısan!");
//                     return;
//                 }

//                 const res = await fetch(`${API_URL}/wishlist/${postId}`, {
//                     method: "POST",
//                     headers: { Authorization: `Bearer ${token}` },
//                 });

//                 const data = await res.json();
//                 alert(data.message);
//             });




//             if (postsDiv.children.length > 4) {
//                 postsDiv.style.cssText =
//                     `
//                  overflow-X: scroll;
//                  overflow-Y: hidden;
//                 `

//                 if (btnDirection && btnDirection.children.length === 0) {
//                     let btnLeft = document.createElement("button");
//                     btnLeft.classList.add("btn-left");
//                     btnLeft.innerHTML = `<i class="bi bi-arrow-left"></i>`;

//                     let btnRight = document.createElement("button");
//                     btnRight.classList.add("btn-right");
//                     btnRight.innerHTML = `<i class="bi bi-arrow-right"></i>`;

//                     let step = 200;
//                     btnLeft.addEventListener("click", () => {
//                         postsDiv.scrollBy({ left: -step, behavior: 'smooth' })
//                     })

//                     btnRight.addEventListener("click", () => {
//                         postsDiv.scrollBy({ left: step, behavior: 'smooth' })
//                     })

//                     btnDirection.appendChild(btnLeft);
//                     btnDirection.appendChild(btnRight);
//                 }

//             }

//         });
//     } catch (err) {
//         console.error("Postlar yüklənərkən xəta:", err);
//     }
// }

// loadPosts();


// const buttons = document.querySelectorAll(".btn-course");
// buttons.forEach((btn, index) => {

//     buttons[index].addEventListener("click", async () => {

//         buttons.forEach(item => {
//             item.style.cssText = `border: none; color: #2a2b3f7c`
//         });

//         btn.style.cssText = `border-bottom: 2px solid #000; color: #000;`;

//         try {
//             const res = await fetch(`${API_URL}/posts`);
//             const posts = await res.json();


//             if (!posts || posts.length === 0) {
//                 postsDiv.innerHTML = `
//             <p 
//                 style="
//                     font-size: 20px; 
//                     color: gray; 
//                     text-align: center;
//                     padding: 30px 0;
//             ">
//                 Hazırda heç bir kurs yoxdur.
//             </p>`;
//                 return;
//             }


//             postsDiv.innerHTML = "";
//             posts.reverse().forEach(p => {
//                 if (index === 0) {
//                     const div = document.createElement("div");
//                     div.classList.add("lesson-card")

//                     let tarix = p.createdAt.slice(0, 10);
//                     let tersTarix = tarix.split("-").reverse().join("-");

//                     let price = p.price || "pulsuz"

//                     div.innerHTML = `
//                             <img src="${p.courseCover}" alt="Post şəkli">                 
//                             <div class="card-text">
//                             <h3>${p.text || ""}</h3>
//                             <span>${p.username}</span>
//                                 <span>${price}</span>
//                                 <span>${tersTarix}</span>
//                                 <button class="wish-btn" data-id="${p.id}">❤️ Wishlistə əlavə et</button>
//                             </div>
//                             `;

//                     div.addEventListener("click", () => {
//                         localStorage.setItem("selectedPost", JSON.stringify(p));
//                         window.location.href = "./document/video.html";
//                     });

//                     postsDiv.appendChild(div);
//                 } else if (index === 1) {

//                     if (p.category === "JavaScript") {
//                         const div = document.createElement("div");
//                         div.classList.add("lesson-card")

//                         let tarix = p.createdAt.slice(0, 10);
//                         let tersTarix = tarix.split("-").reverse().join("-");

//                         div.innerHTML = `
//                         <img src="${p.courseCover}" alt="Post şəkli">                 
//                             <div class="card-text">
//                                 <h3>${p.text || ""}</h3>
//                                 <span>${p.username}</span>
//                                 <span>${tersTarix}</span>
//                                 <button class="wish-btn" data-id="${p.id}">❤️ Wishlistə əlavə et</button>
//                             </div>
//                             `;


//                         div.addEventListener("click", () => {
//                             localStorage.setItem("selectedPost", JSON.stringify(p));
//                             window.location.href = "./document/video.html";
//                         });

//                         postsDiv.appendChild(div);
//                     }

//                 } else if (index === 2) {
//                     if (p.category === "C++") {

//                         const div = document.createElement("div");
//                         div.classList.add("lesson-card")

//                         let tarix = p.createdAt.slice(0, 10);
//                         let tersTarix = tarix.split("-").reverse().join("-");

//                         div.innerHTML = `
//                             <img src="${p.courseCover}" alt="Post şəkli">                 
//                             <div class="card-text">
//                                 <h3>${p.text || ""}</h3>
//                                 <span>${p.username}</span>
//                                 <span>${tersTarix}</span>
//                                 <button class="wish-btn" data-id="${p.id}">❤️ Wishlistə əlavə et</button>
//                             </div>
//                             `;


//                         div.addEventListener("click", () => {
//                             localStorage.setItem("selectedPost", JSON.stringify(p));
//                             window.location.href = "./document/video.html";
//                         });

//                         postsDiv.appendChild(div);
//                     }

//                     // else {

//                     //     postsDiv.innerHTML = `
//                     //         <p 
//                     //             style="
//                     //                 font-size: 20px; 
//                     //                 color: gray; 
//                     //                 text-align: center;
//                     //                 padding: 30px 0;
//                     //         ">
//                     //             Hazırda heç bir kurs yoxdur.
//                     //         </p>`;
//                     // }

//                 } else if (index === 3) {
//                     if (p.category === "React JS") {
//                         const div = document.createElement("div");
//                         div.classList.add("lesson-card")

//                         let tarix = p.createdAt.slice(0, 10);
//                         let tersTarix = tarix.split("-").reverse().join("-");

//                         div.innerHTML = `
//                             <img src="${p.courseCover}" alt="Post şəkli">                 
//                             <div class="card-text">
//                                 <h3>${p.text || ""}</h3>
//                                 <span>${p.username}</span>
//                                 <span>${tersTarix}</span>
//                                 <button class="wish-btn" data-id="${p.id}">❤️ Wishlistə əlavə et</button>
//                             </div>
//                             `;


//                         div.addEventListener("click", () => {
//                             localStorage.setItem("selectedPost", JSON.stringify(p));
//                             window.location.href = "./document/video.html";
//                         });

//                         postsDiv.appendChild(div);
//                     }
//                 } else if (index === 4) {
//                     if (p.category === "Python") {
//                         const div = document.createElement("div");
//                         div.classList.add("lesson-card")

//                         let tarix = p.createdAt.slice(0, 10);
//                         let tersTarix = tarix.split("-").reverse().join("-");

//                         div.innerHTML = `
//                             <img src="${p.courseCover}" alt="Post şəkli">                 
//                             <div class="card-text">
//                                 <h3>${p.text || ""}</h3>
//                                 <span>${p.username}</span>
//                                 <span>${tersTarix}</span>
//                                 <button class="wish-btn" data-id="${p.id}">❤️ Wishlistə əlavə et</button>
//                             </div>
//                             `;


//                         div.addEventListener("click", () => {
//                             localStorage.setItem("selectedPost", JSON.stringify(p));
//                             window.location.href = "./document/video.html";
//                         });

//                         postsDiv.appendChild(div);
//                     }
//                 } else if (index === 5) {
//                     if (p.category === "Canva") {
//                         const div = document.createElement("div");
//                         div.classList.add("lesson-card")

//                         let tarix = p.createdAt.slice(0, 10);
//                         let tersTarix = tarix.split("-").reverse().join("-");

//                         div.innerHTML = `
//                             <img src="${p.courseCover}" alt="Post şəkli">                 
//                             <div class="card-text">
//                                 <h3>${p.text || ""}</h3>
//                                 <span>${p.username}</span>
//                                 <span>${tersTarix}</span>
//                                 <button class="wish-btn" data-id="${p.id}">❤️ Wishlistə əlavə et</button>
//                             </div>
//                             `;


//                         div.addEventListener("click", () => {
//                             localStorage.setItem("selectedPost", JSON.stringify(p));
//                             window.location.href = "./document/video.html";
//                         });

//                         postsDiv.appendChild(div);
//                     }
//                 } else if (index === 6) {
//                     if (p.category === "Other") {
//                         const div = document.createElement("div");
//                         div.classList.add("lesson-card")

//                         let tarix = p.createdAt.slice(0, 10);
//                         let tersTarix = tarix.split("-").reverse().join("-");

//                         div.innerHTML = `
//                         <img src="${p.courseCover}" alt="Post şəkli">                 
//                             <div class="card-text">
//                                 <h3>${p.text || ""}</h3>
//                                 <span>${p.username}</span>
//                                 <span>${tersTarix}</span>
//                                 <button class="wish-btn" data-id="${p.id}">❤️ Wishlistə əlavə et</button>
//                                 </div>
//                             `;
//                         div.addEventListener("click", () => {
//                             localStorage.setItem("selectedPost", JSON.stringify(p));
//                             window.location.href = "./document/video.html";
//                         });

//                         postsDiv.appendChild(div);
//                     }
//                 }
//             });
//         } catch (err) {
//             console.error("Postları yükləməkdə xəta:", err);
//         }
//     });
// });


const postsDiv = document.getElementById("posts");
const searchInp = document.getElementById("search-input");
const searchIcon = document.getElementById("search-icon");

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

function createPostElement(p) {
    const div = document.createElement("div");
    div.classList.add("lesson-card", "card", "shadow");

    const videoCount = p.videos ? p.videos.length : 0;
    const tarix = p.createdAt.slice(0, 10).split("-").reverse().join("-");
    const price = p.price || "pulsuz";

    let titleText = p.text || "";
    let paddingBottom = "30px";

    if (titleText.length > 38) {
        paddingBottom = "15px";
    }
    if (titleText.length > 79) {
        titleText = titleText.slice(0, 76) + "...";
    }

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
                <span class="price">${price === "pulsuz" ? "Ödənişsiz" : `${price} ₼`}</span>
            </div>
        </div>`;

    div.addEventListener("click", (e) => {
        if (e.target.classList.contains('wish-btn')) return;

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

        const topSixPosts = postsWithRatings.slice(0, 6);

        postsDiv.innerHTML = "";
        topSixPosts.forEach(p => {
            postsDiv.appendChild(createPostElement(p));
        });

    } catch (err) {
        console.error("Postlar yüklənərkən xəta:", err);
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
    allItems.forEach(item => {
        item.classList.remove('active');
    });

    element.classList.add('active');
}
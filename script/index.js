// // Data göndərmək (POST)
// fetch("http://localhost:5000/api/users", {
//     method: "POST",
//     headers: {"Content-Type": "application/json"},
//     body: JSON.stringify({name: "Ramil", age: 67})
// })
// .then(res => res.json())
// .then(data => console.log(data));

// fetch("http://localhost:5000/api/users")
// .then(res => res.json())
// .then(data => console.log(data));

// Məsələn: sən about.html-də olsan
// window.history.pushState({}, "", "/index");



let searchInp = document.getElementById("search-inp");
let searchIcon = document.getElementById("search-icon");
let scrollBtn = document.getElementById("scrollBtn");
const exitBtn = document.getElementById("exitBtn")
const timerModal = document.querySelector(".timer-fade")
const locationCourse = document.getElementById("locationCourse")
const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");
const courseCard = document.querySelector(".course-card")
const regPart = document.querySelector(".registration-part")
const conAll = document.querySelector(".conAll")
const API_URL = "https://codebyte-backend-ibyq.onrender.com";
// courseCard.addEventListener("click", () => {

//     window.location.href = "../document/ders.html"
// })


loginBtn.onclick = () => {
    // window.location.href = "https://codebyte-main.netlify.app/document/login.html"
    console.log("Login btn calisir");

}

registerBtn.onclick = () => {
    window.location.href = "frontend/document/register.html"
}

if (localStorage.getItem("exitBtn") === "true" || localStorage.getItem("locationCourse") === "true") {
    timerModal.style.display = "none";
}

exitBtn.addEventListener("click", () => {

    timerModal.style.display = "none";
    localStorage.setItem("exitBtn", "true");
})

locationCourse.onclick = () => {

    window.location.href = "../document/kurs.html"
    localStorage.setItem("locationCourse", "true");
}

// COUNTDOWN 1 AYLIQ

const countDownDate = new Date();
countDownDate.setMonth(countDownDate.getMonth() + 1);

const countdownEl = document.querySelector(".countdown");

const timer = setInterval(() => {
    const now = new Date().getTime();
    const distance = countDownDate - now;

    if (distance <= 0) {
        clearInterval(timer);
        countdownEl.innerHTML = "<span>Vaxt bitdi</span>";
        return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    countdownEl.innerHTML = `
        <span>${days} gün</span> 
        <span>${hours} saat</span> 
        <span>${minutes} dəq</span> 
        <span>${seconds} san</span>
    `;
}, 1000);

window.addEventListener("scroll", () => {
    if (window.scrollY <= 100) {
        scrollBtn.style.display = "none";
    } else {
        scrollBtn.style.display = "block"
    }
})

scrollBtn.addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
})

searchInp.addEventListener("input", () => {

    if (searchInp.value != "") {

        searchIcon.style.display = "inline-block";
    } else {

        searchIcon.style.display = "none";
    }
})
let slideBox = document.querySelector(".slide-box");

let slideFirst = `
    <img id="slide-img" src="./image/slide-photo.png" alt="Error 404">
    <div class="img-text">
        <h1>Proqramlaşdırma öyrənmək heç vaxt bu qədər asan olmayıb!</h1>
        <p>CodeByte ilə proqramlaşdırma biliklərinizi artırın və karyeranızı yeni zirvələrə daşıyın. İndi başlayın!</p>
        <button class="begin-button">Başla</button>
    </div>`;

let slideSecond = `
    <img id="slide-img" src="./image/slide-photo-second.png" alt="Error 404">
    <div class="img-text-second">
        <h1>Texnologiya ilə gələcəyini qur!</h1>
        <p>AI və proqramlaşdırma bacarıqları ilə karyerana yeni nəfəs ver. CodeByte ilə gələcəyə addım at!</p>
        <button class="begin-button">Başla</button>
    </div>`;

let arr = [slideFirst, slideSecond];
let index = 0;

// Slaydı göstərmək və butona event bağlamaq üçün funksiya
function showSlide(i) {
    slideBox.innerHTML = arr[i];

    // Slayd yükləndikdən sonra butonu seçirik
    let beginButton = slideBox.querySelector(".begin-button");
    beginButton.addEventListener("click", () => {
        window.scrollTo({
            top: 708,
            behavior: "smooth"
        })
    });
}

// İlk slaydı göstəririk
showSlide(index);

// Avtomatik dəyişmə
setInterval(() => {
    index++;
    if (index > arr.length - 1) {
        index = 0;
    }
    showSlide(index);
}, 5000);

let books = document.getElementById("booksHtmlSwitch");

books.addEventListener("click", () => {
    window.location.href = "./document/books.html";
})



// ANSWER BOX JS
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


document.querySelectorAll("#wishlist-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        let card = btn.closest(".course-card");

        let course = {
            id: card.dataset.id,
            title: card.dataset.title,
            price: card.dataset.price
        };

        let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

        if (!wishlist.some(item => item.id === course.id)) {
            wishlist.push(course);
            localStorage.setItem("wishlist", JSON.stringify(wishlist));
            alert(`${course.title} sevimlilərə əlavə olundu!`);
        } else {
            alert(`${course.title} artıq sevimlilərdədir!`);
        }
    });
});

const userData = localStorage.getItem("registeredUser");

if (userData) {
    const user = JSON.parse(userData);

    registerBtn.style.display = "none";
    loginBtn.style.display = "none";

    // userInfo.innerHTML = `
    //     <div class="profil-img">
    //     </div>
    //   `;
    const userInfo = document.createElement("div");
    const postAdd = document.createElement("button");
    const postManage = document.createElement("button");
    userInfo.id = "userInfo";
    userInfo.innerHTML =
        `
        <div class="profil-img">
        </div>
    `

    postAdd.textContent = "Post Add";
    postAdd.id = "postAdd";

    postManage.textContent = "Post Manage";
    postManage.id = "postManage"

    regPart.appendChild(userInfo)
    regPart.appendChild(postAdd)
    regPart.appendChild(postManage)
    postAdd.addEventListener("click", () => {

        window.location.href = "./document/post-add.html"
    })
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
        <button id="logOut"><i class="bi bi-box-arrow-right"></i> Log Out</button>
    `
    regPart.appendChild(userDiv);

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

const logData = localStorage.getItem("loginUser");


if (logData) {

    const user = JSON.parse(logData);

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
        <button id="postAdd"><i class="bi bi-plus-square"></i> Post add</button>
        <button id="postManage"><i class="bi bi-view-list"></i> Post Manage</button>
        <button id="logOut"><i class="bi bi-box-arrow-right"></i> Log Out</button>
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

        localStorage.removeItem('loginUser');
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

const postsDiv = document.getElementById("posts");
const btnDirection = document.querySelector(".btn-direction")

async function loadPosts() {
    try {
        const res = await fetch(`${API_URL}/posts`);
        const posts = await res.json();

        if (!posts || posts.length === 0) {
            postsDiv.innerHTML = `
            <p 
                style="
                    font-size: 20px; 
                    color: gray; 
                    text-align: center;
                    padding: 30px 0;
            ">
                Hazırda heç bir kurs yoxdur.
            </p>`;
            return;
        }

        postsDiv.innerHTML = "";
        posts.reverse().forEach(p => {
            const div = document.createElement("div");
            div.classList.add("lesson-card")

            let tarix = p.createdAt.slice(0, 10);
            let tersTarix = tarix.split("-").reverse().join("-");

            div.innerHTML = `
                <img src="${API_URL}/uploads/${p.courseCover}" alt="Post şəkli">
                <div class="card-text">
                    <h3>${p.text || ""}</h3>
                    <span>${p.username}</span>
                    <span>${tersTarix}</span>
                    <button class="wish-btn" data-id="${p.id}">❤️ Wishlistə əlavə et</button>
                </div>
          `;



            div.addEventListener("click", () => {
                localStorage.setItem("selectedPost", JSON.stringify(p));
                window.location.href = "./document/video.html";
            });

            postsDiv.appendChild(div);

            const wishBtn = div.querySelector(".wish-btn");
            wishBtn.addEventListener("click", async (e) => {
                e.stopPropagation(); // klik videoya yönəlməsin
                const postId = wishBtn.dataset.id;
                const token = localStorage.getItem("token");

                if (!token) {
                    alert("Əvvəlcə daxil olmalısan!");
                    return;
                }

                const res = await fetch(`${API_URL}/wishlist/${postId}`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                });

                const data = await res.json();
                alert(data.message);
            });


            const lessonCard = document.querySelectorAll(".lesson-card")



            if (postsDiv.children.length > 6) {
                postsDiv.style.cssText =
                    `
                 overflow-X: scroll;
                 overflow-Y: hidden;
                `

                let btnLeft = document.querySelector(".btn-left");
                let btnRight = document.querySelector(".btn-right");

                if (!btnLeft) {
                    btnLeft = document.createElement("button");
                    btnLeft.classList.add("btn-left");
                    btnLeft.innerHTML = `<i class="bi bi-arrow-left"></i>`;
                    // btnDirection.appendChild(btnLeft);
                }

                if (!btnRight) {
                    btnRight = document.createElement("button");
                    btnRight.classList.add("btn-right");
                    btnRight.innerHTML = `<i class="bi bi-arrow-right"></i>`;
                    // btnDirection.appendChild(btnRight);
                }


                let step = 200;
                btnLeft.addEventListener("click", () => {

                    postsDiv.scrollBy({
                        left: -step,
                        behavior: 'smooth'
                    })
                })

                btnRight.addEventListener("click", () => {
                    postsDiv.scrollBy({
                        left: step,
                        behavior: 'smooth'
                    })
                })

                // btnLeft.innerHTML = `<i class="bi bi-arrow-left"></i>`
                // btnRight.innerHTML = `<i class="bi bi-arrow-right"></i>`

                // btnLeft.classList.add("btn-left");
                // btnRight.classList.add("btn-right");

                btnDirection.appendChild(btnLeft);
                btnDirection.appendChild(btnRight);



            }

        });
    } catch (err) {
        console.error("Postlar yüklənərkən xəta:", err);
    }
}

loadPosts();

const buttons = document.querySelectorAll(".btn-course");
buttons.forEach((btn, index) => {

    buttons[index].addEventListener("click", async () => {

        buttons.forEach(item => {
            item.style.cssText = `border: none; color: #2a2b3f7c`
        });

        btn.style.cssText = `border-bottom: 2px solid #000; color: #000;`;

        try {
            const res = await fetch(`${API_URL}/posts`);
            const posts = await res.json();


            if (!posts || posts.length === 0) {
                postsDiv.innerHTML = `
            <p 
                style="
                    font-size: 20px; 
                    color: gray; 
                    text-align: center;
                    padding: 30px 0;
            ">
                Hazırda heç bir kurs yoxdur.
            </p>`;
                return;
            }

            postsDiv.innerHTML = "";
            posts.reverse().forEach(p => {
                if (index === 0) {
                    const div = document.createElement("div");
                    div.classList.add("lesson-card")
                    div.innerHTML = `
                                <img src="${API_URL}/uploads/${p.courseCover}" alt="Post şəkli">
                                <div class="card-text">
                                    <h3>${p.text || ""}</h3>
                                    <span>${p.username}</span>
                                </div>
                            `;

                    div.addEventListener("click", () => {
                        localStorage.setItem("selectedPost", JSON.stringify(p));
                        window.location.href = "./document/video.html";
                    });

                    postsDiv.appendChild(div);
                } else if (index === 1) {

                    if (p.category[0] === "JavaScript") {
                        const div = document.createElement("div");
                        div.classList.add("lesson-card")
                        div.innerHTML = `
                                <img src="${API_URL}/uploads/${p.courseCover}" alt="Post şəkli">
                                <div class="card-text">
                                    <h3>${p.text || ""}</h3>
                                    <span>${p.username}</span>
                                </div>
                            `;

                        div.addEventListener("click", () => {
                            localStorage.setItem("selectedPost", JSON.stringify(p));
                            window.location.href = "./document/video.html";
                        });

                        postsDiv.appendChild(div);
                    } 

                } else if (index === 2) {
                    if (p.category[0] === "C++") {

                        const div = document.createElement("div");
                        div.classList.add("lesson-card")
                        div.innerHTML = `
                                <img src="${API_URL}/uploads/${p.courseCover}" alt="Post şəkli">
                                <div class="card-text">
                                    <h3>${p.text || ""}</h3>
                                    <span>${p.username}</span>
                                </div>
                            `;

                        div.addEventListener("click", () => {
                            localStorage.setItem("selectedPost", JSON.stringify(p));
                            window.location.href = "./document/video.html";
                        });

                        postsDiv.appendChild(div);
                    } 

                    // else {

                    //     postsDiv.innerHTML = `
                    //         <p 
                    //             style="
                    //                 font-size: 20px; 
                    //                 color: gray; 
                    //                 text-align: center;
                    //                 padding: 30px 0;
                    //         ">
                    //             Hazırda heç bir kurs yoxdur.
                    //         </p>`;
                    // }

                } else if (index === 3) {
                    if (p.category[0] === "React JS") {
                        const div = document.createElement("div");
                        div.classList.add("lesson-card")
                        div.innerHTML = `
                                <img src="${API_URL}/uploads/${p.courseCover}" alt="Post şəkli">
                                <div class="card-text">
                                    <h3>${p.text || ""}</h3>
                                    <span>${p.username}</span>
                                </div>
                            `;

                        div.addEventListener("click", () => {
                            localStorage.setItem("selectedPost", JSON.stringify(p));
                            window.location.href = "./document/video.html";
                        });

                        postsDiv.appendChild(div);
                    }
                } else if (index === 4) {
                    if (p.category[0] === "Python") {
                        const div = document.createElement("div");
                        div.classList.add("lesson-card")
                        div.innerHTML = `
                                <img src="${API_URL}/uploads/${p.courseCover}" alt="Post şəkli">
                                <div class="card-text">
                                    <h3>${p.text || ""}</h3>
                                    <span>${p.username}</span>
                                </div>
                            `;

                        div.addEventListener("click", () => {
                            localStorage.setItem("selectedPost", JSON.stringify(p));
                            window.location.href = "./document/video.html";
                        });

                        postsDiv.appendChild(div);
                    } 
                } else if (index === 5) {
                    if (p.category[0] === "Canva") {
                        const div = document.createElement("div");
                        div.classList.add("lesson-card")
                        div.innerHTML = `
                                <img src="${API_URL}/uploads/${p.courseCover}" alt="Post şəkli">
                                <div class="card-text">
                                    <h3>${p.text || ""}</h3>
                                    <span>${p.username}</span>
                                </div>
                            `;

                        div.addEventListener("click", () => {
                            localStorage.setItem("selectedPost", JSON.stringify(p));
                            window.location.href = "./document/video.html";
                        });

                        postsDiv.appendChild(div);
                    } 
                } else if (index === 6) {
                    if (p.category[0] === "Other") {
                        const div = document.createElement("div");
                        div.classList.add("lesson-card")
                        div.innerHTML = `
                                <img src="${API_URL}/uploads/${p.courseCover}" alt="Post şəkli">
                                <div class="card-text">
                                    <h3>${p.text || ""}</h3>
                                    <span>${p.username}</span>
                                </div>
                            `;

                        div.addEventListener("click", () => {
                            localStorage.setItem("selectedPost", JSON.stringify(p));
                            window.location.href = "./document/video.html";
                        });

                        postsDiv.appendChild(div);
                    } 
                }
            });
        } catch (err) {
            console.error("Postları yükləməkdə xəta:", err);
        }
    });
});

const loginBtn = document.getElementById("login");
const registerBtn = document.getElementById("register");

loginBtn.onclick = () => {
    window.location.href = "../document/login.html"
}

registerBtn.onclick = () => {
    window.location.href = "../document/qeydiyyat.html"
}

const API_URL = "https://codebyte-backend-ibyq.onrender.com";


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



            if (postsDiv.children.length > 5) {
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

const menuBtn = document.querySelector(".menu");
let menuDiv = null;

menuBtn.addEventListener("click", () => {

    if (menuDiv === null) {
        menuDiv = document.createElement("div");

        menuDiv.classList.add("menu-div");
        menuDiv.classList.add("forClose")

        menuDiv.innerHTML =
            `
            <div class="menu-item">
                <span id="closeMenu" class="forClose"><i class="bi bi-x"></i></span>
                <button id="loginWithMenu">Daxil olun</button>
                <button id="regWithMenu">Qeydiyyat</button>
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

        loginWithMenu.addEventListener("click", () => {

            window.location.href = "./login.html"
        })


        regWithMenu.addEventListener("click", () => {

            window.location.href = "./register.html"
        })

        if (logData) {

            const user = JSON.parse(logData);


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

                localStorage.removeItem('loginUser');
                window.location.reload();
            })

            const postAddMenu = document.getElementById("postAddMenu");


            postAddMenu.addEventListener("click", () => {

                window.location.href = "./document/post-add.html";
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
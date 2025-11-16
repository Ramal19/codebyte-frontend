const searchInp = document.getElementById("search-inp");
const searchBtn = document.getElementById("search-icon");
const registerBtn = document.querySelector(".register-button");
const loginBtn = document.querySelector(".login-button");
const regPart = document.querySelector(".registration-part");
const postsDiv = document.getElementById("posts");
const btnDirection = document.querySelector(".btn-direction");
const logo = document.querySelector(".logo");

const API_URL = "https://codebyte-backend-ibyq.onrender.com";

searchInp.value = localStorage.getItem("searchValue") || "";

// searchBtn.style.display = searchInp.value !== "" ? "block" : "none";

function showUserPanel(user, storageKey) {
    registerBtn.style.display = "none";
    loginBtn.style.display = "none";

    const userInfo = document.createElement("div");
    userInfo.id = "userInfo";
    userInfo.innerHTML = `<div class="profil-img"></div>`;
    regPart.appendChild(userInfo);

    const userDiv = document.createElement("div");
    userDiv.classList.add("user-div");
    userDiv.innerHTML = `
      <div class="user-item">
          <div class="profil-img"></div>
          <div>
              <h3>${user.username}</h3>
              <p>${user.email || ""}</p>
          </div>
      </div>
      <button id="postAdd"><i class="bi bi-plus-square"></i> Kurs Paylaş</button>
      <button id="postManage"><i class="bi bi-view-list"></i> Ümumi Kurslar</button>
      <button id="logOut"><i class="bi bi-box-arrow-right"></i> Çıxış et</button>
  `;
    regPart.appendChild(userDiv);

    const profilImgs = document.querySelectorAll(".profil-img");
    profilImgs.forEach((el, index) => {
        el.textContent = user.username[0];
        if (index === 1) {
            el.style.cssText = `width: 64px; height: 64px; font-size: 28px;`;
        }
    });

    regPart.addEventListener("mouseover", () => (userDiv.style.display = "flex"));
    regPart.addEventListener("mouseout", () => (userDiv.style.display = "none"));
    userDiv.addEventListener("mouseover", () => (userDiv.style.display = "flex"));
    userDiv.addEventListener("mouseout", () => (userDiv.style.display = "none"));

    document.getElementById("postAdd").addEventListener("click", () => {
        window.location.href = "./post-add.html";
    });

    document.getElementById("postManage").addEventListener("click", () => {
        window.location.href = "./post-manage.html";
    });

    document.getElementById("logOut").addEventListener("click", () => {
        localStorage.removeItem(storageKey);
        window.location.reload();
    });
}

const logData = localStorage.getItem("loginUser");
const userData = localStorage.getItem("registeredUser");
if (userData) showUserPanel(JSON.parse(userData), "registeredUser");
else if (logData) showUserPanel(JSON.parse(logData), "loginUser");
else {
    registerBtn.addEventListener("click", () => (window.location.href = "./register.html"));
    loginBtn.addEventListener("click", () => (window.location.href = "./login.html"));
}

logo.addEventListener("click", () => {
    window.location.href = "../index.html";
});

function searchCard() {
    const query = searchInp.value.toLowerCase();
    const lessonCards = document.querySelectorAll(".lesson-card");
    let found = false;

    lessonCards.forEach((card) => {
        const title = card.querySelector(".card-text h3").innerText.toLowerCase();
        if (title.includes(query)) {
            card.style.display = "flex";
            found = true;
        } else {
            card.style.display = "none";
        }
    });

    // Əgər heç bir nəticə tapılmayıbsa, yazını göstər
    const notFound = document.querySelector(".not-found");
    if (!found) {
        if (!notFound) {
            const p = document.createElement("p");
            p.classList.add("not-found");
            p.textContent = "Nəticə tapılmadı";
            p.style.cssText = `
        text-align: center;
        font-size: 18px;
        color: gray;
        padding: 30px 0;
      `;
            postsDiv.appendChild(p);
        }
    } else {
        if (notFound) notFound.remove();
    }
}

searchInp.addEventListener("input", () => {
    const query = searchInp.value.trim();
    localStorage.setItem("searchValue", query);
    // searchBtn.style.display = query ? "inline-block" : "none";
});

searchBtn.addEventListener("click", () => {
    if (searchInp.value.trim() !== "") {
        localStorage.setItem("searchValue", searchInp.value);
        searchCard();
    }
});

async function loadPosts() {
    try {
        const res = await fetch(`${API_URL}/posts`);
        const posts = await res.json();

        if (!posts || posts.length === 0) {
            postsDiv.innerHTML = `
        <p style="font-size:20px;color:gray;text-align:center;padding:30px 0;">
          Hazırda heç bir kurs yoxdur.
        </p>`;
            return;
        }

        postsDiv.innerHTML = "";
        posts.reverse().forEach((p) => {
            const div = document.createElement("div");
            div.classList.add("lesson-card");

            const tarix = p.createdAt?.slice(0, 10);
            const tersTarix = tarix ? tarix.split("-").reverse().join("-") : "";

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
                if (userData || logData) {
                    localStorage.setItem("selectedPost", JSON.stringify(p));
                    window.location.href = "./video.html";
                } else showLoginModal(p);
            });

            const wishBtn = div.querySelector(".wish-btn");
            wishBtn.addEventListener("click", async (e) => {
                e.stopPropagation();
                e.preventDefault();

                const token = localStorage.getItem("token");
                if (!token) {
                    alert("Əvvəlcə daxil olmalısan!");
                    return;
                }

                const res = await fetch(`${API_URL}/wishlist/${p.id}`, {
                    method: "POST",
                    headers: { Authorization: `Bearer ${token}` },
                });
                const data = await res.json();
                alert(data.message);
            });

            postsDiv.appendChild(div);
        });

        if (postsDiv.children.length > 5) {
            postsDiv.style.cssText = `overflow-x: scroll; overflow-y: hidden;`;
            let btnLeft = document.createElement("button");
            btnLeft.classList.add("btn-left");
            btnLeft.innerHTML = `<i class="bi bi-arrow-left"></i>`;

            let btnRight = document.createElement("button");
            btnRight.classList.add("btn-right");
            btnRight.innerHTML = `<i class="bi bi-arrow-right"></i>`;

            const step = 200;
            btnLeft.addEventListener("click", () => postsDiv.scrollBy({ left: -step, behavior: "smooth" }));
            btnRight.addEventListener("click", () => postsDiv.scrollBy({ left: step, behavior: "smooth" }));

            btnDirection.appendChild(btnLeft);
            btnDirection.appendChild(btnRight);
        }
    } catch (err) {
        console.error("Postlar yüklənərkən xəta:", err);
    }
}

function showLoginModal(p) {
    if (document.querySelector(".logform-blurDiv")) return;

    const logForm = document.createElement("div");
    logForm.classList.add("logform-blurDiv");
    logForm.innerHTML = `
    <div class="container-logForm">
      <div class="content">
        <img src="../image/CodeByte.png"/>
        <h2 style="margin-bottom: 20px;">İzləmək üçün qeydiyyatdan keçməlisiniz!</h2>
        <form id="loginForm" class="content__form">
          <div class="content__inputs">
            <label><input class="input" name="username" type="text" id="username-inp" required><span>Username</span></label>
            <label><input required class="input" name="password" type="password" id="password-inp"><span>Password</span></label>
          </div>
          <button>Daxil ol</button>
        </form>
        <div class="content__forgot-buttons">
          <span>Hesabınız yoxdurmu ? <a href="./register.html">Qeydiyyatdan keçin.</a></span>
          <button class="exit-logForm">Cancel</button>
        </div>
      </div>
    </div>
  `;
    document.body.style.overflow = "hidden";
    document.body.appendChild(logForm);

    const exitLogForm = document.querySelector(".exit-logForm");
    exitLogForm.addEventListener("click", () => {
        document.body.removeChild(logForm);
        document.body.style.overflow = "auto";
    });

    const form = document.getElementById("loginForm");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const user = form.username.value.trim();
        const pass = form.password.value.trim();
        localStorage.setItem("selectedPost", JSON.stringify(p));

        const data = { username: user, password: pass };
        const res = await fetch(`${API_URL}/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data),
        });

        const json = await res.json();
        if (res.ok) {
            localStorage.setItem("token", json.token);
            localStorage.setItem(
                "loginUser",
                JSON.stringify({ username: data.username, email: json.email || "" })
            );
            alert("Giriş uğurludur!");
            window.location.href = "./video.html";
        } else {
            alert(json.message || "Giriş zamanı xəta baş verdi.");
        }
    });
}

loadPosts();

window.addEventListener("beforeunload", () => {
    localStorage.removeItem("searchValue");
});

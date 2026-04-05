const API_URL = "https://codebyte-backend-ibyq.onrender.com/api/contact";

const userData = localStorage.getItem("registeredUser");
const logData = localStorage.getItem("loginUser");

document.getElementById("sendBtn").addEventListener("click", async (e) => {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !surname || !email || !message) {
        Swal.fire({
            icon: "warning",
            title: "Xanalar boşdur",
            text: "Zəhmət olmasa bütün xanaları doldurun!",
        });
        return;
    }

    try {
        const res = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, surname, email, phone, message }),
        });

        const data = await res.json();

        if (res.ok) {
            Swal.fire({
                icon: "success",
                title: "Mesaj göndərildi!",
                text: "Təşəkkürlər, tezliklə sizinlə əlaqə saxlayacağıq.",
            });
            document.querySelectorAll("input, textarea").forEach((inp) => (inp.value = ""));
        } else {
            Swal.fire({
                icon: "error",
                title: "Xəta baş verdi",
                text: data.message || "Mesaj göndərilə bilmədi.",
            });
        }
    } catch (err) {
        console.error("Contact error:", err);
        Swal.fire({
            icon: "error",
            title: "Bağlantı xətası",
            text: "Serverlə əlaqə qurmaq mümkün olmadı.",
        });
    }
});


const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
    window.location.href = "../index.html";
});

console.log(logo);

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
                <button id="toContact"><i class="bi bi-chat-left-text"></i> Əlaqə</button>
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
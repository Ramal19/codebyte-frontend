const regUser = localStorage.getItem("registeredUser");

if (regUser) {
    alert("Siz artiq qeydiyyatdan kecmisiniz!")
    window.location.href = "../index.html"
} 

const API_URL = "https://codebyte-backend-ibyq.onrender.com"

const userInp = document.getElementById("username-inp")

const form = document.getElementById("loginForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        username: form.username.value,
        password: form.password.value
    };
    const res = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    if (res.ok) {
        localStorage.setItem("token", json.token);
        localStorage.setItem("loginUser", JSON.stringify({
            username: data.username,
            // email: json.email
        }));

        // document.getElementById("msg").innerText = "Giriş uğurludur!";

        Swal.fire({
            title: "Giriş uğurludur!",
            icon: "success",
        }).then((result) => {
            if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {

                console.log("İstifadəçi OK düyməsini kliklədi");

                window.location.href = "../index.html";
            }
        });

    } else {
        // document.getElementById("msg").innerText = json.message;
        alert(json.message)
    }
});


const inputs = document.querySelectorAll(".input");
const icons = document.querySelectorAll(".icon");

inputs.forEach((inp, index) => {

    inp.addEventListener("click", () => {
        if (index === 0) {
            icons.forEach((el, index) => {
                if (index === 0) {
                    el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`
                }
            });
        } else {
            icons.forEach((el, index) => {
                if (index === 1) {
                    el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`
                }
            });
        }
    })
});

icons.forEach((el, index) => {
    el.addEventListener("click", () => {
        if (index === 0) {
            el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`
        } else {
            el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`
        }
    })
});
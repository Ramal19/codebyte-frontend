// const reg = document.getElementById("reg");

// reg.onclick = () => { window.location.href = "./login.html" }

const form = document.getElementById("regForm");
form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const data = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
    };
    const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });
    const json = await res.json();
    document.getElementById("msg").innerText = json.message;

    if (json.message && json.message.toLowerCase().includes("uğur")) {
        localStorage.setItem("registeredUser", JSON.stringify({
            username: data.username,
            email: data.email
        }));

        window.location.href = "./index.html";
    }

});

// FRONTEND

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
        } else if (index === 1) {
            icons.forEach((el, index) => {
                if (index === 1) {
                    el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`
                }
            });
        } else {
            icons.forEach((el, index) => {
                if (index === 2) {
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
            inputs.forEach((el, index) => {
                if (index === 0) {
                    el.focus()
                }
            })
        } else {
            el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`
            inputs.forEach((el, index) => {
                if (index === 1) {
                    el.focus()
                }
            })
        }
    })
});

let eye = document.querySelector(".bi-eye-fill");
let eyeClose = document.querySelector(".bi-eye-slash-fill")

eyeClose.style.display = "none";

eye.addEventListener("click", () => {

    inputs.forEach((el, index) => {

        if (index === 2) {
            if (el.type = "password") {
                el.type = "text"
                eye.style.display = "none"
                eyeClose.style.display = "inline-block"
            }
        }
    })
})

eyeClose.addEventListener("click", () => {

    inputs.forEach((el, index) => {
        if (index === 2) {
            if (el.type = "text") {
                el.type = "password"
                eye.style.display = "inline-block"
                eyeClose.style.display = "none"
            }
        }
    })
})



inputs.forEach((inp, index) => {

    inp.addEventListener("focus", () => {
        if (index === 0) {
            icons.forEach((el, index) => {
                if (index === 0) {
                    el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`
                }
            });
        } else if (index === 1) {
            icons.forEach((el, index) => {
                if (index === 1) {
                    el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`
                }
            });
        } else {
            icons.forEach((el, index) => {
                if (index === 2) {
                    el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`
                }
            });
        }
    })
});
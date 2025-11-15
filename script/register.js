const regUser = localStorage.getItem("registeredUser");
const loginUser = localStorage.getItem("loginUser");

if (regUser || loginUser) {
    alert("Siz artıq qeydiyyatdan keçmisiniz!");
    window.location.href = "../index.html";
}

const API_URL = "https://codebyte-backend-ibyq.onrender.com"

const form = document.getElementById("regForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        username: form.username.value,
        email: form.email.value,
        password: form.password.value
    };

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const json = await res.json();

        let iconType = "error";
        const isSuccess = json.message && json.message.toLowerCase().includes("uğur");

        if (isSuccess) {
            iconType = "success";

            localStorage.setItem("token", json.token);

            localStorage.setItem("registeredUser", JSON.stringify({
                username: data.username,
                email: data.email,
                role: data.role
            }));

        }

        Swal.fire({
            title: json.message,
            icon: iconType,
        }).then((result) => {
            if (isSuccess && (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop)) {
                console.log("Qeydiyyat uğurlu oldu, ana səhifəyə yönləndirilir.");
                window.location.href = "../index.html";
            }
        });

    } catch (error) {
        console.error("Qeydiyyat prosesində kritik xəta:", error);
        Swal.fire({
            title: "Xəta!",
            text: "Server ilə əlaqə qurularkən xəta baş verdi.",
            icon: "error"
        });
    }
});


const inputs = document.querySelectorAll(".input");
const icons = document.querySelectorAll(".icon");


inputs.forEach((inp, index) => {
    inp.addEventListener("click", () => {
        if (icons[index]) {
            icons[index].style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`;
        }
    });

    inp.addEventListener("focus", () => {
        if (icons[index]) {
            icons[index].style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`;
        }
    });
});

icons.forEach((el, index) => {
    el.addEventListener("click", () => {
        el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`;
        if (inputs[index]) {
            inputs[index].focus();
        }
    });
});



let eye = document.querySelector(".bi-eye-fill");
let eyeClose = document.querySelector(".bi-eye-slash-fill")
const passwordInput = inputs[2]; 

if (eyeClose) {
    eyeClose.style.display = "none";
}

if (eye) {
    eye.addEventListener("click", () => {
        passwordInput.type = "text";

        eye.style.display = "none";
        eyeClose.style.display = "inline-block";
    });
}

if (eyeClose) {
    eyeClose.addEventListener("click", () => {
        passwordInput.type = "password";

        eye.style.display = "inline-block";
        eyeClose.style.display = "none";
    });
}
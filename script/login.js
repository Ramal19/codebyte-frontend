const regUser = localStorage.getItem("registeredUser");
const loginUser = localStorage.getItem("loginUser");

if (regUser || loginUser) {
    alert("Siz artıq daxil olmusunuz!");
    window.location.href = "../index.html";
}

const API_URL = "https://codebyte-backend-ibyq.onrender.com"

const form = document.getElementById("loginForm");

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        username: form.username.value,
        password: form.password.value
    };

    try {
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
                role: json.role
            }));

            Swal.fire({
                title: "Giriş uğurludur!",
                icon: "success",
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {

                    if (json.role === "admin") {
                        window.location.href = "../admin-dashboard/documents/a1d2m3i4n5P1a2n3e4l5.html";
                    } else {
                        window.location.href = "../index.html";
                    }
                }
            });

        } else {
            // Giriş uğursuz olarsa, serverdən gələn xəta mesajını göstər
            alert(json.message);
        }
    } catch (error) {
        console.error("Giriş prosesində kritik xəta:", error);
        alert("Server ilə əlaqə qurularkən xəta baş verdi.");
    }
});

// --- UI İdarəetmə Kodları ---

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
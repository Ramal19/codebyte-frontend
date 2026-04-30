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

            // BURADA DƏYİŞİKLİK EDİLDİ: 
            // json obyektindən gələn profilePic və email-i də yaddaşa yazırıq
            localStorage.setItem("loginUser", JSON.stringify({
                username: data.username,
                role: json.role,
                profilePic: json.profilePic || "", // Serverdən gələn şəkil
                email: json.email || ""            // Serverdən gələn mail
            }));

            Swal.fire({
                title: "Giriş uğurludur!",
                icon: "success",
            }).then((result) => {
                if (result.isConfirmed || result.dismiss === Swal.DismissReason.backdrop) {
                    window.location.href = "../index.html";
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
    // Sənin yazdığın click məntiqini saxladım, 
    // amma inputun içinə yazı yazılanda yuxarıda qalması üçün kiçik əlavə etdim
    inp.addEventListener("click", () => {
        icons[index].style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`;
    });

    // Əlavə: İnputdan çıxanda içi boşdursa ikonu yerinə qaytar
    inp.addEventListener("blur", () => {
        if (inp.value === "") {
            icons[index].style.cssText = `font-size: initial; transform: translateY(0); transition: all 0.3s ease;`;
        }
    });
});

icons.forEach((el, index) => {
    el.addEventListener("click", () => {
        el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`
    });
});
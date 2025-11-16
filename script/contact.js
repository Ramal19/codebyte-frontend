const API_URL = "https://codebyte-backend-ibyq.onrender.com/api/contact";

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

// let sendBtn = document.getElementById("sendBtn");
// let empty = document.querySelectorAll(".empty");

// sendBtn.addEventListener("click", () => {

//     const messages = [
//         "Adınızı qeyd edin!",
//         "Soyadınızı qeyd edin!",
//         "Emailinizi qeyd edin",
//         "Telefon nömrənizi qeyd edin!",
//         "Mesajınızı qeyd edin!"
//     ]

//     for (let i = 0; i < empty.length; i++) {

//         empty.forEach(el => {

//             if (el.value === "") {
//                 el.style.border = "1px solid red"
//             }
//         });

//         let el = empty[i];

//         if (el.value.trim() === "") {

//             Swal.fire({
//                 icon: "error",
//                 title: "Oops...",
//                 text: `${messages[i]} Boş qalmamalıdır!`,
//             });

//             el.style.border = "1px solid red";

//             break;
//         } else {

//             el.style.border = "1px solid #ccc";
//         }
//     }

// })

// const loginBtn = document.getElementById("login");
// const registerBtn = document.getElementById("register");

// loginBtn.onclick = () => {
//     window.location.href = "../document/login.html"
// }

// registerBtn.onclick = () => {
//     window.location.href = "../document/qeydiyyat.html"
// }

const API_URL = "https://codebyte-backend-ibyq.onrender.com";
document.getElementById("sendBtn").addEventListener("click", async () => {
    const name = document.getElementById("name").value.trim();
    const surname = document.getElementById("surname").value.trim();
    const email = document.getElementById("email").value.trim();
    const phone = document.getElementById("phone").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !surname || !email || !message) {
        alert("Zəhmət olmasa bütün xanaları doldurun!");
        return;
    }

    try {
        const res = await fetch("https://codebyte-backend-ibyq.onrender.com/contacts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, surname, email, phone, message }),
        });

        const data = await res.json();
        if (res.ok) {
            alert(data.message);
            document.querySelectorAll("input, textarea").forEach((inp) => (inp.value = ""));
        } else {
            alert(data.message || "Xəta baş verdi");
        }
    } catch (err) {
        console.error("Contact error:", err);
        alert("Serverlə əlaqə qurmaq mümkün olmadı.");
    }
});

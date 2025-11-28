// Dəyişənlərin ilkin təyini
const regUser = localStorage.getItem("registeredUser");
const loginUser = localStorage.getItem("loginUser");

// Səhifəyə girişi yoxlamaq
if (regUser || loginUser) {
    alert("Siz artıq qeydiyyatdan keçmisiniz!");
    window.location.href = "../index.html";
}

const API_URL = "https://codebyte-backend-ibyq.onrender.com"
const form = document.getElementById("regForm");

// Lazım olan elementləri təyin edirik
const inpPass = document.getElementById("reg-password");
let line = document.querySelector(".line");
let pass_length = document.querySelector(".pass-length"); // Xəbərdarlıq mesajı

// Başlanğıcda xəbərdarlıq mesajını gizlədirik
if (pass_length) {
    pass_length.style.display = "none";
}


// --- 1. FORM SUBMIT HADİSƏSİ (DÜYMƏYƏ KLİK) ---
form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Parolun gücünü yoxlamaq üçün funksiya (bu, API-yə göndərilməzdən əvvəl yoxlamadır)
    const password = form.password.value;
    let strengthScore = 0; 

    // Parol tələbləri
    if (password.length >= 8) { strengthScore++; }
    if (/[a-z]/.test(password)) { strengthScore++; }
    if (/[A-Z]/.test(password)) { strengthScore++; }
    if (/[0-9]/.test(password)) { strengthScore++; }
    if (/[^A-Za-z0-9\s]/.test(password)) { strengthScore++; }
    
    // ƏSAS MƏNTİQ: Əgər parol tam güclü deyilsə (score 5-dən azdırsa)
    if (strengthScore < 5) {
        // .pass-length elementini görünən et
        if (pass_length) {
            pass_length.style.display = "block"; 
            // Əlavə olaraq parolu daxil etdiyi inputa fokuslanma
            inpPass.focus();
        }
        
        // Forma göndərilməsini dayandır və funksiyanı tərk et
        return; 
    } else {
        // Əgər parol güclüdürsə, mesajı gizlət (əvvəlki yoxlamadan qalıbsa)
        if (pass_length) {
            pass_length.style.display = "none";
        }
    }


    // Əgər kod bu nöqtəyə gəlibsə, deməli parol güclüdür və API sorğusu icra oluna bilər
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
                role: json.role // role-u json-dan alırıq
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


// --- 2. INPUT HADİSƏSİ (DİNAMİK GÜC GÖSTƏRİCİSİ) ---
// Bu hissə sadəcə line elementinin rəngini və genişliyini dəyişir,
// lakin pass-length-i görünən etmir (Submit-ə qədər gözləyir)

inpPass.addEventListener("input", () => {
    const password = inpPass.value;
    let strengthScore = 0; 

    // Tələbləri yoxlamaq
    if (password.length >= 8) { strengthScore++; }
    if (/[a-z]/.test(password)) { strengthScore++; }
    if (/[A-Z]/.test(password)) { strengthScore++; }
    if (/[0-9]/.test(password)) { strengthScore++; }
    if (/[^A-Za-z0-9\s]/.test(password)) { strengthScore++; }


    let widthPercentage = (strengthScore / 5) * 100;
    let backgroundColor = 'red'; 

    if (strengthScore === 5) {
        backgroundColor = 'green'; 
    } else if (strengthScore >= 3) {
        backgroundColor = 'orange'; 
    } else if (strengthScore >= 1) {
        backgroundColor = 'red'; 
    } else {
        widthPercentage = 0; 
        backgroundColor = 'transparent';
    }

    // Pass-length mesajı burada idarə olunmur, line elementini yeniləyirik
    line.style.cssText =
        `
        width: ${widthPercentage}%;
        background-color: ${backgroundColor};
        height: 100%;
        transition: width 0.3s, background-color 0.3s;
    `;
    
    // İnput zamanı bütün parollar sıfırlanarsa mesajı gizlədirik
    if (password.length === 0 && pass_length) {
         pass_length.style.display = "none";
    }
});


// --- 3. INPUT VƏ ICON HADİSƏLƏRİ (DƏYİŞİLMƏDƏN QALAN KOD) ---

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

    inp.addEventListener("focusout", () => {

        if (inp.value.trim() === "") {
            if (icons[index]) {
                icons[index].style.cssText = `font-size: 18px; transform: translateY(0); transition: all 0.3s ease;`;
            }
        }

    })
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
const passwordInput = inputs[2]; // Üçüncü inputun parol inputu olduğunu güman edirik

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
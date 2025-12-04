emailjs.init("EsHztpH0Dv7cXaD1n");

const regUser = localStorage.getItem("registeredUser");
const loginUser = localStorage.getItem("loginUser");

if (regUser || loginUser) {
    Swal.fire({
        title: "Xəbərdarlıq!",
        text: "Siz artıq qeydiyyatdan keçmisiniz!",
        icon: "warning",
        timer: 3000,
        showConfirmButton: false
    }).then(() => {
        window.location.href = "../index.html";
    });
}

const API_URL = "https://codebyte-backend-ibyq.onrender.com";
const form = document.getElementById("regForm");

const inpPass = document.getElementById("reg-password");
const line = document.querySelector(".line");
const passRequirements = document.getElementById("pass-requirements");
const requirementsListItems = document.querySelectorAll('#pass-requirements li');


const verificationContainer = document.getElementById("verificationContainer");
const verificationCodeInput = document.getElementById("verificationCodeInput");
const verifyButton = document.getElementById("verifyButton");

let generatedVerificationCode = null;
let userDataToRegister = {};

const EMAILJS_SERVICE_ID = "service_uxvssjk";
const EMAILJS_TEMPLATE_ID = "template_i41ipll";


function getPasswordStrength(password) {
    let score = 0;
    const checks = {
        length: password.length >= 8,
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9\s]/.test(password)
    };
    Object.keys(checks).forEach(key => { if (checks[key]) score++; });
    return { score, checks };
}

function updatePasswordRequirements(checks) {
    requirementsListItems.forEach(li => {
        const reqKey = li.getAttribute('data-requirement');
        if (checks[reqKey]) li.classList.add('fulfilled');
        else li.classList.remove('fulfilled');
    });
}

function updateStrengthBar(score) {
    let widthPercentage = (score / 5) * 100;
    let backgroundColor = 'red';

    if (score === 5) backgroundColor = 'green';
    else if (score >= 3) backgroundColor = 'orange';
    else backgroundColor = 'red';

    line.style.width = widthPercentage + "%";
    line.style.backgroundColor = backgroundColor;
    line.style.height = "10px";
}

if (passRequirements) {
    passRequirements.style.display = 'none';
}



form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        username: form.username.value.trim(),
        email: form.email.value.trim(),
        password: form.password.value
    };

    if (!data.username || !data.email || !data.password) {
        Swal.fire({ title: "Diqqət!", text: "Bütün sahələri doldurun.", icon: "warning" });
        return;
    }

    const { score } = getPasswordStrength(data.password);
    if (score < 5) {
        if (passRequirements) passRequirements.style.display = 'block';
        inpPass.focus();
        Swal.fire({ title: "Diqqət!", text: "Parol bütün tələblərə cavab verməlidir.", icon: "warning" });
        return;
    }

    userDataToRegister = data;

    const regButton = document.querySelector('.Qeydiyyat-btn');
    if (regButton) {
        regButton.textContent = "Yoxlanılır...";
        regButton.disabled = true;
    }


    try {
        const checkRes = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        if (!checkRes.ok) {
            const errorJson = await checkRes.json();
            const errorMessage = errorJson.message || "Bilinməyən xəta baş verdi.";

            if (checkRes.status === 409) {
                Swal.fire({
                    title: "Qeydiyyat Xətası (409) 🛑",
                    text: errorMessage,
                    icon: "warning"
                });
                return;
            }
            else {
                Swal.fire({
                    title: "Qeydiyyat Xətası ❌",
                    text: errorMessage,
                    icon: "error"
                });
                return;
            }
        }

        const successJson = await checkRes.json();

        localStorage.setItem("token", successJson.token);
        localStorage.setItem("registeredUser", JSON.stringify({
            username: data.username,
            email: data.email,
            role: successJson.role
        }));

        Swal.fire({
            title: "Qeydiyyat Uğurlu! 🎉",
            text: "Qeydiyyatınız uğurla tamamlandı. Giriş səhifəsinə yönləndirilirsiniz.",
            icon: "success"
        }).then(() => {
            window.location.href = "../index.html";
        });

        return;

    } catch (error) {
        console.error("Server yoxlamasında xəta:", error);
        Swal.fire({
            title: "Server Xətası! 🛑",
            text: "Server ilə əlaqə qurularkən gözlənilməz bir xəta baş verdi.",
            icon: "error"
        });
        return;
    } finally {
        const regButton = document.querySelector('.Qeydiyyat-btn');
        if (regButton) {
            regButton.textContent = "Qeydiyyatdan keç";
            regButton.disabled = false;
        }
    }

});

if (verifyButton) {
    verifyButton.addEventListener("click", async () => {
        const userEnteredCode = verificationCodeInput.value.trim();

        if (!userEnteredCode || userEnteredCode.length !== 6) {
            Swal.fire({ title: "Diqqət!", text: "Zəhmət olmasa, 6 rəqəmli təsdiq kodunu daxil edin.", icon: "warning" });
            return;
        }

        if (userEnteredCode === String(generatedVerificationCode)) {
            Swal.fire({ title: "Məntiq Xətası", text: "Qeydiyyat məntiqi dəyişib. Server yoxlaması artıq tamamlanıb.", icon: "error" });

        } else {
            Swal.fire({
                title: "Yanlış Kod! 🔄",
                text: "Daxil etdiyiniz təsdiq kodu yanlışdır. Zəhmət olmasa, yenidən yoxlayın.",
                icon: "error"
            });
        }
    });
}


if (inpPass) {
    inpPass.addEventListener("input", () => {
        const password = inpPass.value;
        const { score, checks } = getPasswordStrength(password);

        updateStrengthBar(score);
        updatePasswordRequirements(checks);

        if (password.length > 0 && score < 5) passRequirements.style.display = 'block';
        else passRequirements.style.display = 'none';
    });
}



const inputs = document.querySelectorAll(".input");
const icons = document.querySelectorAll(".icon");

inputs.forEach((inp, index) => {
    inp.addEventListener("click", () => {
        if (icons[index]) icons[index].style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`;
    });
    inp.addEventListener("focus", () => {
        if (icons[index]) icons[index].style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`;
    });
    inp.addEventListener("focusout", () => {
        if (inp.value.trim() === "" && icons[index]) {
            icons[index].style.cssText = `font-size: 18px; transform: translateY(0); transition: all 0.3s ease;`;
        }
    });
});

icons.forEach((el, index) => {
    el.addEventListener("click", () => {
        el.style.cssText = `font-size: 14px; transform: translateY(-25px); transition: all 0.3s ease;`;
        if (inputs[index]) inputs[index].focus();
    });
});

let eye = document.querySelector(".bi-eye-fill");
let eyeClose = document.querySelector(".bi-eye-slash-fill");

if (eyeClose) eyeClose.style.display = "none";

if (eye && eyeClose && inpPass) {
    eye.addEventListener("click", () => {
        inpPass.type = "text";
        eye.style.display = "none";
        eyeClose.style.display = "inline-block";
    });

    eyeClose.addEventListener("click", () => {
        inpPass.type = "password";
        eye.style.display = "inline-block";
        eyeClose.style.display = "none";
    });
}

emailjs.init("EsHztpH0Dv7cXaD1n");

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
    const checks = {
        length: password.length >= 8,
        lower: /[a-z]/.test(password),
        upper: /[A-Z]/.test(password),
        number: /[0-9]/.test(password),
        symbol: /[^A-Za-z0-9\s]/.test(password)
    };
    let score = Object.values(checks).filter(Boolean).length;
    return { score, checks };
}

function updatePasswordRequirements(checks) {
    requirementsListItems.forEach(li => {
        const reqKey = li.getAttribute('data-requirement');
        if (checks[reqKey]) li.classList.add('fulfilled');
        else li.classList.remove('fulfilled');
    });
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const data = {
        username: form.username.value.trim(),
        email: form.email.value.trim(),
        password: form.password.value
    };

    const { score } = getPasswordStrength(data.password);
    if (score < 5) {
        Swal.fire({ title: "Diqqət!", text: "Parol tələblərə cavab vermir.", icon: "warning" });
        return;
    }

    const regButton = document.getElementById("reg");
    regButton.textContent = "Yoxlanılır...";
    regButton.disabled = true;

    try {
        const checkRes = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...data, checkOnly: true })
        });

        const checkJson = await checkRes.json();
        if (!checkRes.ok) throw new Error(checkJson.message || "Bu istifadəçi artıq mövcuddur.");

        userDataToRegister = data;
        generatedVerificationCode = Math.floor(100000 + Math.random() * 900000);

        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
            user_email: data.email,
            from_name: "CodeByte Support",
            verification_code: generatedVerificationCode,
            message: "Sizin təsdiq kodunuz: " + generatedVerificationCode
        });

        Swal.fire({ title: "Kod Göndərildi!", text: "Zəhmət olmasa emailinizi yoxlayın.", icon: "success" });
        form.style.display = 'none';
        verificationContainer.style.display = 'flex';

    } catch (error) {
        Swal.fire({ title: "Xəta!", text: error.message, icon: "error" });
        regButton.textContent = "Qeydiyyatdan keç";
        regButton.disabled = false;
    }
});

verifyButton.addEventListener("click", async () => {
    const userEnteredCode = verificationCodeInput.value.trim();

    if (userEnteredCode !== String(generatedVerificationCode)) {
        Swal.fire({ title: "Səhv!", text: "Daxil etdiyiniz kod yanlışdır.", icon: "error" });
        return;
    }

    verifyButton.textContent = "Hesab yaradılır...";
    verifyButton.disabled = true;

    try {
        const res = await fetch(`${API_URL}/register`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userDataToRegister)
        });

        const json = await res.json();
        if (!res.ok) throw new Error(json.message || "Qeydiyyat zamanı xəta.");

        localStorage.setItem("token", json.token);
        localStorage.setItem("registeredUser", JSON.stringify({
            username: userDataToRegister.username,
            email: userDataToRegister.email,
            role: json.role
        }));

        Swal.fire({ title: "Uğurlu!", text: "Qeydiyyat tamamlandı! Xoş gəldiniz.", icon: "success" })
            .then(() => window.location.href = "../index.html");

    } catch (error) {
        Swal.fire({ title: "Xəta!", text: error.message, icon: "error" });
        verifyButton.textContent = "Kodu Təsdiqlə";
        verifyButton.disabled = false;
    }
});

if (inpPass) {
    inpPass.addEventListener("input", () => {
        const { score, checks } = getPasswordStrength(inpPass.value);
        updatePasswordRequirements(checks);

        let widthPercentage = (score / 5) * 100;
        line.style.width = widthPercentage + "%";
        line.style.backgroundColor = score === 5 ? 'green' : (score >= 3 ? 'orange' : 'red');
        line.style.height = "5px";

        passRequirements.style.display = (inpPass.value.length > 0 && score < 5) ? 'block' : 'none';
    });
}

let eye = document.querySelector(".bi-eye-fill");
let eyeClose = document.querySelector(".bi-eye-slash-fill");
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

const inputs = document.querySelectorAll(".input");
const icons = document.querySelectorAll(".icon");
inputs.forEach((inp, index) => {

    inp.addEventListener("focus", () => {

        if (index === 0) {
            icons.forEach((el, index) => {
                if (index === 0) {

                    el.style.cssText = `transform: translateY(-25px); font-size: 14px`
                }
            })
        } else if (index === 1) {
            icons.forEach((el, index) => {
                if (index === 1) {

                    el.style.cssText = `transform: translateY(-25px); font-size: 14px`
                }
            })
        } else {
            icons.forEach((el, index) => {
                if (index === 2) {

                    el.style.cssText = `transform: translateY(-25px); font-size: 14px`
                }
            })
        }

    })

    inp.addEventListener("blur", () => {

        if (index === 0) {
            icons.forEach((el, index) => {
                if (index === 0) {

                    el.style.cssText = `transform: translateY(0); font-size: 18px`
                }
            })
        } else if (index === 1) {
            icons.forEach((el, index) => {
                if (index === 1) {

                    el.style.cssText = `transform: translateY(0); font-size: 18px`
                }
            })
        } else {
            icons.forEach((el, index) => {
                if (index === 2) {

                    el.style.cssText = `transform: translateY(0); font-size: 18px`
                }
            })
        }

        if (index === 0 && inp.value.trim() !== "") {
            icons.forEach((el, index) => {
                if (index === 0) {
                    el.style.cssText = `transform: translateY(-25px); font-size: 14px`
                }
            })
        } else if (index === 1 && inp.value.trim() !== "") {
            icons.forEach((el, index) => {
                if (index === 1) {
                    el.style.cssText = `transform: translateY(-25px); font-size: 14px`
                }
            })
        } else {

            icons.forEach((el, index) => {
                if (index === 2) {
                    el.style.cssText = `transform: translateY(-25px); font-size: 14px`
                }
            })
        }
    })




});
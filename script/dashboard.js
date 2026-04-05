const API_URL = "https://codebyte-backend-ibyq.onrender.com";
const token = localStorage.getItem("token");
let loginUser = JSON.parse(localStorage.getItem("loginUser"));

// Təhlükəsizlik yoxlaması: Token və ya istifadəçi yoxdursa login-ə at
if (!token || !loginUser) {
    window.location.href = "login.html";
}

document.addEventListener("DOMContentLoaded", () => {
    // 1. Profil məlumatlarını ekrana yaz
    renderProfile();

    // 2. İstifadəçinin kurslarını gətir
    fetchUserCourses();
});

// Profil məlumatlarını UI-da göstərən köməkçi funksiya
function renderProfile() {
    const usernameDisplay = document.getElementById("usernameDisplay");
    const userEmail = document.getElementById("userEmail");
    const userAvatar = document.getElementById("userAvatar");

    if (usernameDisplay) usernameDisplay.textContent = loginUser.username;
    if (userEmail) userEmail.textContent = loginUser.email || "E-mail qeyd olunmayıb";

    if (userAvatar && loginUser.profilePic) {
        userAvatar.src = loginUser.profilePic;
    }
}

// Kursları backend-dən gətirən funksiya
async function fetchUserCourses() {
    const grid = document.getElementById("courseGrid");
    try {
        const res = await fetch(`${API_URL}/posts `, {
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            }
        });

        const contentType = res.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
            throw new Error("Server hazır deyil və ya səhv cavab qaytardı.");
        }

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Kurslar gətirilərkən xəta.");
        }

        const courses = await res.json();
        renderCourses(courses);
    } catch (error) {
        console.error("Kurslar yüklənmədi:", error);
        if (grid) {
            grid.innerHTML = `<p style="color: #e74c3c; padding: 20px;">Xəta: ${error.message}</p>`;
        }
    }
}

// Kursları ekranda göstərən funksiya
function renderCourses(courses) {
    const grid = document.getElementById("courseGrid");
    if (!grid) return;

    if (!courses || courses.length === 0) {
        grid.innerHTML = "<p style='padding: 20px;'>Hələ heç bir kurs paylaşmamısınız.</p>";
        return;
    }

    grid.innerHTML = courses.map(course => `
        <div class="course-card">
            <div class="course-img-container">
                <img src="${course.courseCover || 'https://via.placeholder.com/300x150?text=Şəkilsiz'}" alt="Kurs">
            </div>
            <div class="course-info">
                <h4>${course.text}</h4>
                <div class="status-badge ${course.isApproved ? 'approved' : 'pending'}">
                    ${course.isApproved ? '<i class="fas fa-check-circle"></i> Yayımdadır' : '<i class="fas fa-clock"></i> Baxışdadır'}
                </div>
                <div class="actions">
                    <button class="delete-btn" onclick="deleteCourse('${course.id}')">
                        <i class="fas fa-trash"></i> Sil
                    </button>
                    <button class="edit-btn" onclick="editCourse('${course.id}')">
                        <i class="fas fa-edit"></i> Redaktə
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}

// Profil şəkli yükləmə
const avatarInput = document.getElementById("avatarInput");
if (avatarInput) {
    avatarInput.addEventListener("change", async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Fayl tipi yoxlaması
        if (!file.type.startsWith('image/')) {
            Swal.fire("Xəta", "Zəhmət olmasa yalnız şəkil faylı seçin.", "error");
            return;
        }

        const formData = new FormData();
        formData.append("profilePic", file);

        try {
            const userAvatar = document.getElementById("userAvatar");
            if (userAvatar) userAvatar.style.opacity = "0.4";

            const res = await fetch(`${API_URL}/upload-profile-pic`, {
                method: "POST",
                headers: { "Authorization": `Bearer ${token}` },
                body: formData
            });

            const data = await res.json();

            if (res.ok) {
                // UI yenilə
                if (userAvatar) {
                    userAvatar.src = data.imageUrl;
                    userAvatar.style.opacity = "1";
                }

                // LocalStorage yenilə
                loginUser.profilePic = data.imageUrl;
                localStorage.setItem("loginUser", JSON.stringify(loginUser));

                Swal.fire("Uğurlu!", "Profil şəkli yeniləndi.", "success");
            } else {
                throw new Error(data.message || "Yükləmə uğursuz oldu.");
            }
        } catch (error) {
            const userAvatar = document.getElementById("userAvatar");
            if (userAvatar) userAvatar.style.opacity = "1";
            Swal.fire("Xəta!", error.message, "error");
        }
    });
}

// Kurs silmə funksiyası
async function deleteCourse(courseId) {
    const result = await Swal.fire({
        title: 'Əminsiniz?',
        text: "Kurs silindikdən sonra bütün faylları Firebase-dən birdəfəlik silinəcək!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#e74c3c',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Bəli, sil!',
        cancelButtonText: 'Ləğv et'
    });

    if (result.isConfirmed) {
        try {
            const res = await fetch(`${API_URL}/posts/${courseId}`, {
                method: "DELETE",
                headers: { "Authorization": `Bearer ${token}` }
            });

            if (res.ok) {
                Swal.fire('Silindi!', 'Kurs uğurla silindi.', 'success');
                fetchUserCourses();
            } else {
                const data = await res.json();
                Swal.fire('Xəta!', data.message || "Kurs silinmədi.", 'error');
            }
        } catch (error) {
            Swal.fire('Xəta!', 'Serverlə əlaqə qurulmadı.', 'error');
        }
    }
}

// Redaktə üçün (gələcəkdə lazım olsa)
function editCourse(id) {
    console.log("Redaktə ediləcək kurs ID:", id);
    // Bura redaktə səhifəsinə yönləndirmə əlavə edə bilərsən
}

// Çıxış funksiyası
const logoutBtn = document.getElementById("logoutBtn");
if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
        localStorage.removeItem("token");
        localStorage.removeItem("loginUser");
        window.location.href = "login.html";
    });
}
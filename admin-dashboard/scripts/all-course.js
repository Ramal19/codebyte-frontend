const API_URL = "https://codebyte-backend-ibyq.onrender.com";
const token = localStorage.getItem("token");

// Kurs məlumatlarını saxlamaq üçün cache
let activePostsCache = [];

// Elementlərin seçimi
const pendingPostsContainer = document.getElementById("pendingPostsContainer");
const pendingLoadingIndicator = document.getElementById("pendingLoadingIndicator");
const pendingEmptyMessage = document.getElementById("pendingEmptyMessage");
const pendingCount = document.getElementById("pendingCount");

const activePostsContainer = document.getElementById("activePostsContainer");
const activeLoadingIndicator = document.getElementById("activeLoadingIndicator");
const activeEmptyMessage = document.getElementById("activeEmptyMessage");
const activeCount = document.getElementById("activeCount");

const activeSearchInput = document.getElementById("activeSearchInput");

const adminRoleSpan = document.getElementById("adminRole");
const logoutBtn = document.getElementById("logoutBtn");

// --- Təhlükəsizlik və Rol Yoxlanışı ---
async function checkAuthAndRole() {
    if (!token) {
        Swal.fire('Giriş yoxdur', 'Əvvəlcə login olmalısınız.', 'warning').then(() => {
            window.location.href = "../../document/login.html";
        });
        return false;
    }

    try {
        const res = await fetch(`${API_URL}/profile`, {
            headers: { Authorization: "Bearer " + token },
        });

        if (!res.ok) throw new Error("Token səhvdir");

        const data = await res.json();

        if (data.role !== "admin") {
            Swal.fire('İcazə yoxdur', 'Bu səhifəyə yalnız Administratorlar daxil ola bilər.', 'error').then(() => {
                window.location.href = "../index.html";
            });
            return false;
        }
        adminRoleSpan.textContent = `Rol: ${data.role.toUpperCase()}`;
        return true;

    } catch (e) {
        Swal.fire('Xəta', 'Autentifikasiya uğursuz oldu.', 'error').then(() => {
            localStorage.removeItem("token");
            window.location.href = "../../document/login.html";
        });
        return false;
    }
}

// --- Fetch Funksiyaları ---

async function fetchPendingPosts() {
    pendingPostsContainer.innerHTML = '';
    pendingLoadingIndicator.classList.remove('hidden');
    pendingEmptyMessage.classList.add('hidden');

    try {
        const res = await fetch(`${API_URL}/admin/pending-posts`, {
            headers: { Authorization: "Bearer " + token },
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({ message: "Bilinməyən Server Xətası" }));
            Swal.fire('Xəta', 'Baxışda olan kurslar yüklənmədi: ' + err.message, 'error');
            return;
        }

        const posts = await res.json();
        pendingCount.textContent = posts.length;

        if (posts.length === 0) {
            pendingEmptyMessage.classList.remove('hidden');
            // Gözləyən kurs yoxdursa, istifadəçi blokunu qaldır
            localStorage.setItem("hasPendingCourse", "false"); 
        } else {
            // Baxışda olan postları render edir (Təsdiqlə düyməsi aktivdir)
            renderPosts(posts, pendingPostsContainer, true);
        }

    } catch (error) {
        Swal.fire('Əlaqə xətası', 'Serverə qoşularkən xəta baş verdi: ' + error.message, 'error');
        console.error("Fetch pending posts error:", error);
    } finally {
        pendingLoadingIndicator.classList.add('hidden');
    }
}

async function fetchActivePosts() {
    activePostsContainer.innerHTML = '';
    activeLoadingIndicator.classList.remove('hidden');
    activeEmptyMessage.classList.add('hidden');

    try {
        const res = await fetch(`${API_URL}/posts`, {
            headers: { Authorization: "Bearer " + token },
        });

        if (!res.ok) {
            const err = await res.json().catch(() => ({ message: "Bilinməyən Server Xətası" }));
            Swal.fire('Xəta', 'Aktiv kurslar yüklənmədi: ' + err.message, 'error');
            return;
        }

        const posts = await res.json();
        activePostsCache = posts;

        handleSearch();

    } catch (error) {
        Swal.fire('Əlaqə xətası', 'Serverə qoşularkən xəta baş verdi: ' + error.message, 'error');
        console.error("Fetch active posts error:", error);
    } finally {
        activeLoadingIndicator.classList.add('hidden');
    }
}

function handleSearch() {
    if (!activeSearchInput) {
        console.error("Axtarış inputu (activeSearchInput) tapılmadı.");
        activeCount.textContent = activePostsCache.length;
        renderPosts(activePostsCache, activePostsContainer, false);
        return;
    }

    const searchTerm = activeSearchInput.value.toLowerCase().trim();

    let filteredPosts = activePostsCache;

    if (searchTerm) {
        filteredPosts = activePostsCache.filter(post =>
            (post.text && post.text.toLowerCase().includes(searchTerm)) ||
            (post.category && post.category.toLowerCase().includes(searchTerm)) ||
            (post.username && post.username.toLowerCase().includes(searchTerm))
        );
    }

    activeCount.textContent = filteredPosts.length;
    if (filteredPosts.length === 0) {
        activeEmptyMessage.classList.remove('hidden');
        activePostsContainer.innerHTML = '';
    } else {
        activeEmptyMessage.classList.add('hidden');
        renderPosts(filteredPosts, activePostsContainer, false);
    }
}


function renderPosts(posts, container, showApproveButton) {
    container.innerHTML = '';
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.id = `post-${post.id}`;
        postElement.className = 'post-card';

        const videoCount = post.videos ? post.videos.length : 0;
        const formattedDate = new Date(post.createdAt).toLocaleDateString('az-AZ', { day: 'numeric', month: 'short', year: 'numeric' });

        const postDetailsJson = JSON.stringify(post);
        
        // 💡 DÜZƏLİŞ: JSON stringi içindəki qoşa dırnaqları tək dırnaqlara çeviririk ki, HTML atributunda problem yaratmasın.
        const safePostDetailsJson = postDetailsJson.replace(/"/g, "'"); 

        const approveButtonHTML = showApproveButton ? `
                    <button 
                        data-id="${post.id}" 
                        data-post='${safePostDetailsJson}' 
                        class="view-btn btn btn-flex-1"
                    >
                        <i class="fas fa-eye mr-1"></i> Bax
                    </button>
                    <button data-id="${post.id}" class="approve-btn btn btn-flex-1">
                        <i class="fas fa-check mr-1"></i> Təsdiqlə
                    </button>
                ` : `
                    <button 
                        data-id="${post.id}" 
                        data-post='${safePostDetailsJson}' 
                        class="view-btn btn btn-flex-1"
                    >
                        <i class="fas fa-eye mr-1"></i> Bax
                    </button>
                `;

        const deleteButtonHTML = `
                    <button data-id="${post.id}" class="delete-btn btn ${showApproveButton ? 'btn-flex-1' : 'btn-flex-1'}">
                        <i class="fas fa-trash-alt mr-1"></i> Sil
                    </button>
                `;

        const actionClass = showApproveButton ? 'pending-actions' : 'active-actions';

        const conditionalButtons = showApproveButton ?
            `${approveButtonHTML}${deleteButtonHTML}` :
            `${approveButtonHTML}${deleteButtonHTML}`;

        const buttonsHTML = `
                    <div class="card-actions ${actionClass}" style="display: flex; gap: 10px;">
                        ${conditionalButtons}
                    </div>
                `;


        postElement.innerHTML = `
                    <div class="course-cover">
                        <img src="${post.courseCover}" alt="Kurs Şəkli">
                    </div>
                    <div class="card-body">
                        <div class="card-header">
                            <h3 class="card-title">${post.text}</h3>
                            <span class="card-category">${post.category}</span>
                        </div>
                        <p class="card-meta">Təqdim edən: <span>${post.username}</span></p>
                        
                        <div class="card-details">
                            <p><i class="fas fa-video mr-2"></i> ${videoCount} Video</p>
                            <p><i class="fas fa-calendar-alt mr-2"></i> Tarix: ${formattedDate}</p>
                            <p class="card-price"><i class="fas fa-tag mr-2"></i> ${post.price} ₼</p>
                        </div>
                        ${buttonsHTML}
                    </div>
                `;
        container.appendChild(postElement);
    });

    container.querySelectorAll('.approve-btn').forEach(btn => btn.addEventListener('click', handleApprove));
    container.querySelectorAll('.delete-btn').forEach(btn => btn.addEventListener('click', handleDelete));
    container.querySelectorAll('.view-btn').forEach(btn => btn.addEventListener('click', handleView));
}


function handleView(event) {
    let postDataJson = event.currentTarget.dataset.post; // data-post atributunu oxuyuruq

    if (!postDataJson) {
        Swal.fire('Xəta', 'Kurs məlumatları tapılmadı. Zəhmət olmasa səhifəni yeniləyin.', 'error');
        return;
    }

    try {
        // 💡 DÜZƏLİŞ: data-post tək dırnaqlarla saxlandığı üçün, JSON.parse üçün geri qoşa dırnaqlara çeviririk.
        postDataJson = postDataJson.replace(/'/g, '"'); 
        
        const postData = JSON.parse(postDataJson);

        localStorage.setItem("selectedPost", JSON.stringify(postData));

        window.location.href = "../../document/video.html";

    } catch (e) {
        Swal.fire('Xəta', 'Kurs məlumatlarını emal edərkən xəta baş verdi.', 'error');
        console.error("JSON Parse Error:", e);
    }
}


async function handleApprove(event) {
    const postId = event.currentTarget.dataset.id;

    Swal.fire({
        title: 'Əminsiniz?',
        text: "Bu kursu dərhal yayımlamaq istədiyinizə əminsiniz?",
        icon: 'question',
        showCancelButton: true,
        confirmButtonColor: '#10b981',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Bəli, Təsdiqlə!',
        cancelButtonText: 'Ləğv et'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await fetch(`${API_URL}/posts/${postId}/approve`, {
                    method: "PATCH",
                    headers: {
                        Authorization: "Bearer " + token,
                        "Content-Type": "application/json"
                    },
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({ message: "Bilinməyən Xəta" }));
                    throw new Error(err.message || "Təsdiqlənmə uğursuz oldu");
                }

                Swal.fire('Təsdiqləndi!', 'Kurs uğurla yayımlandı.', 'success');
                
                // Kurs təsdiqləndi, istifadəçi bloku qaldırılır
                localStorage.setItem("hasPendingCourse", "false"); 
                
                fetchPendingPosts();
                fetchActivePosts();
            } catch (e) {
                Swal.fire('Xəta!', 'Təsdiqləmə zamanı server xətası baş verdi: ' + e.message, 'error');
                console.error("Approve error:", e);
            }
        }
    });
}


async function handleDelete(event) {
    const postId = event.currentTarget.dataset.id;

    Swal.fire({
        title: 'Əminsiniz?',
        text: "Bu kursu silmək istədiyinizə əminsiniz? Bu, geri qaytarılmaz bir əməliyyatdır.",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#ef4444',
        cancelButtonColor: '#6b7280',
        confirmButtonText: 'Bəli, Sil!',
        cancelButtonText: 'Ləğv et'
    }).then(async (result) => {
        if (result.isConfirmed) {
            try {
                const res = await fetch(`${API_URL}/posts/${postId}`, {
                    method: "DELETE",
                    headers: { Authorization: "Bearer " + token },
                });

                if (!res.ok) {
                    const err = await res.json().catch(() => ({ message: "Bilinməyən Xəta" }));
                    throw new Error(err.message || "Silinmə uğursuz oldu");
                }

                Swal.fire('Silindi!', 'Kurs uğurla silindi.', 'success');
                
                // Kurs silindi, istifadəçi bloku qaldırılır
                localStorage.setItem("hasPendingCourse", "false"); 
                
                fetchPendingPosts();
                fetchActivePosts();
            } catch (e) {
                Swal.fire('Xəta!', 'Silinmə zamanı server xətası baş verdi: ' + e.message, 'error');
                console.error("Delete error:", e);
            }
        }
    });
}


logoutBtn.addEventListener('click', () => {
    localStorage.removeItem("hasPendingCourse"); 
    
    Swal.fire('Çıxış', 'Sistemdən çıxış edildi.', 'info').then(() => {
        window.location.href = "../../index.html";
    });
});


if (activeSearchInput) {
    activeSearchInput.addEventListener('input', handleSearch);
}

document.addEventListener('DOMContentLoaded', async () => {
    const isAuth = await checkAuthAndRole();
    if (isAuth) {
        fetchPendingPosts();
        fetchActivePosts();
    }
});
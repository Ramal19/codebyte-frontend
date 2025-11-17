// ... (Mövcud kodun yuxarı hissəsi)

const API_URL = "https://codebyte-backend-ibyq.onrender.com";
const post = JSON.parse(localStorage.getItem("selectedPost"));

if (!post) {
    document.body.innerHTML = "<h3>Kurs tapılmadı</h3>";
} else {
    document.getElementById("course-title").textContent = post.text;

    const API_URL = "https://codebyte-backend-ibyq.onrender.com";

    // QEYD: API_URL dəyişəni serverinizin real URL ünvanı ilə əvəz olunmalıdır.

    const post = JSON.parse(localStorage.getItem("selectedPost"));

    if (!post) {
        document.body.innerHTML = "<h3>Kurs tapılmadı</h3>";
    } else {
        document.getElementById("course-title").textContent = post.text;

        const video = document.getElementById("main-video");
        const list = document.getElementById("video-list");

        // Şərh elementləri
        const commentsList = document.getElementById("comments-list");
        const commentTextarea = document.getElementById("comment-text");
        const submitButton = document.getElementById("submit-comment");

        // Cari oynayan videonun indeksi
        let currentVideoIndex = 0;


        // --- Şərhləri yükləmə funksiyası ---
        async function loadComments(postId, videoIndex) {
            commentsList.innerHTML = "Şərhlər yüklənir...";

            try {
                const response = await fetch(`${API_URL}/comments/${postId}/${videoIndex}`);

                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || `Serverdən xəta: Status ${response.status}`);
                }

                const comments = await response.json();

                commentsList.innerHTML = ""; // Təmizlə

                if (comments.length === 0) {
                    commentsList.innerHTML = "<p>Bu video üçün hələ şərh yoxdur.</p>";
                    return;
                }

                comments.forEach(c => {
                    const commentDiv = document.createElement("div");
                    commentDiv.className = "comment";

                    // Firestore timestamp-i Date obyektinə çeviririk
                    let date;
                    if (c.createdAt && c.createdAt._seconds) {
                        date = new Date(c.createdAt._seconds * 1000).toLocaleDateString("az-AZ", {
                            year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                        });
                    } else {
                        date = 'N/A';
                    }

                    commentDiv.innerHTML = `
                    <p><strong>${c.username}:</strong> ${c.text}</p>
                    <small>${date}</small>
                `;
                    commentsList.appendChild(commentDiv);
                });

            } catch (error) {
                console.error("Şərhləri yükləmə xətası:", error);
                commentsList.innerHTML = `<p style="color: red;">Şərhləri yükləyərkən xəta baş verdi: ${error.message}.</p>`;
            }
        }


        // --- Şərh göndərmə funksiyası ---
        async function submitComment() {
            // İstifadəçi tokenini LocalStorage-dan götürün
            const token = localStorage.getItem('token');
            const text = commentTextarea.value.trim();

            if (!token) {
                alert("Şərh yazmaq üçün daxil olmalısınız.");
                return;
            }

            if (text === "") {
                alert("Şərh mətni boş ola bilməz.");
                return;
            }

            submitButton.disabled = true;

            try {
                const response = await fetch(`${API_URL}/comments`, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        postId: post.id,
                        videoIndex: currentVideoIndex, // Cari video indeksi göndərilir
                        text,
                    }),
                });

                const data = await response.json();

                if (response.ok) {
                    alert(data.message);
                    commentTextarea.value = ""; // Formanı təmizlə
                    // Şərhləri yenidən yüklə
                    loadComments(post.id, currentVideoIndex);
                } else {
                    alert(`Şərh göndərilmədi: ${data.message}`);
                }
            } catch (error) {
                console.error("Şərh göndərmə xətası:", error);
                alert("Şərh göndərilərkən server xətası baş verdi.");
            } finally {
                submitButton.disabled = false;
            }
        }


        // Başlanğıc video tənzimlənməsi
        if (post.videos.length > 0) {
            video.src = post.videos[0];
            // Başlanğıc (0-cı) video üçün şərhləri yüklə
            loadComments(post.id, 0);
        }

        // Şərh göndərmə düyməsinə event listener
        submitButton.addEventListener("click", submitComment);


        // Video Siyahısının Yaradılması
        post.videos.forEach((v, i) => {
            const div = document.createElement("div");
            div.className = "video-thumbnail";
            const coverUrl = post.videoCovers[i] || post.courseCover;
            const titleText = post.videoTitles[i] || "Başlıq yoxdur";

            div.innerHTML =
                `
            <img class="img" src ="${coverUrl}">
            <h2>${titleText}</h2> 
          `;

            div.addEventListener("click", () => {
                video.src = v;
                video.play();
                currentVideoIndex = i; // Cari indeksi yenilə
                // Yeni videonun şərhlərini yüklə
                loadComments(post.id, currentVideoIndex);
            });
            list.appendChild(div);
        });
    }

    const logo = document.querySelector(".logo")

    logo.addEventListener("click", () => {
        window.location.href = "../index.html"
    })
}

// window.addEventListener("beforeunload", () => {
//     localStorage.removeItem("selectedPost");
// });

// document.addEventListener('contextmenu', (event) => {
//   // Prevent the default browser context menu from appearing
//   event.preventDefault();

//   // Your custom logic for the right-click event goes here
//   console.log("Right-click detected!");

//   // You can also access information about the event, like mouse coordinates
//   console.log("X-coordinate:", event.clientX);
//   console.log("Y-coordinate:", event.clientY);
// });
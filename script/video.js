
const API_URL = "https://codebyte-backend-ibyq.onrender.com";

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
    const commentsSection = document.getElementById("comments-section");
    const ratingSection = document.getElementById("rating-section");

    // Reytinq elementləri
    const starRatingDiv = document.getElementById("star-rating");
    const ratingMessage = document.getElementById("rating-message");
    const stars = starRatingDiv.querySelectorAll('.star');

    let currentVideoIndex = 0;
    let userHasRated = false; // İstifadəçinin bu kursa reytinq verib-vermədiyini yoxlayır
    let userCurrentScore = 0; // İstifadəçinin verdiyi cari bal

    // Köməkçi funksiya: Ulduzları rəngləmək
    const renderStars = (score) => {
        stars.forEach(star => {
            const starScore = parseInt(star.dataset.score);
            star.textContent = starScore <= score ? '★' : '☆';
            star.style.color = starScore <= score ? 'gold' : 'gray';
        });
    };

    // Reytinq: Serverə göndərilmə funksiyası
    const handleStarClick = async (score) => {
        const token = localStorage.getItem('token');

        if (!token) {
            Swal.fire("Daxil Olun", "Reytinq vermək üçün daxil olmalısınız.", "warning");
            return;
        }

        // 🚨 Əsas yoxlama: İstifadəçi artıq reytinq veribsə, yeni reytinq göndərilmir
        if (userHasRated) {
            Swal.fire("Məlumat", "Siz artıq bu kursa reytinq vermisiniz.", "info");
            return;
        }

        ratingMessage.textContent = "Reytinq göndərilir...";
        renderStars(score); // Kliklənən balı vizual olaraq göstər

        try {
            const response = await fetch(`${API_URL}/rate-course`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`,
                },
                body: JSON.stringify({
                    courseId: post.id,
                    score: score,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                userHasRated = true; // Müvəffəqiyyətlə reytinq verildi
                userCurrentScore = score;
                Swal.fire("Uğurlu!", `Sizin ${score} ulduz reytinqiniz qeydə alındı. Təşəkkür edirik!`, "success");
                loadUserRating(post.id); // Statusu yenidən yüklə
            } else {
                // Əgər artıq reytinq verilibsə (403), loadUserRating yenidən çağırılır
                Swal.fire("Xəta", data.message || "Reytinq göndərilərkən xəta baş verdi.", "error");
                loadUserRating(post.id); // Xəta zamanı əvvəlki statusu bərpa et
            }
        } catch (error) {
            console.error("Reytinq göndərmə xətası:", error);
            Swal.fire("Server Xətası", "Reytinq göndərilərkən gözlənilməz xəta baş verdi.", "error");
            loadUserRating(post.id);
        }
    };

    // Reytinq: İstifadəçinin əvvəlki reytinqini yükləmək
    async function loadUserRating(courseId) {
        const token = localStorage.getItem('token');

        // Dəyişənləri sıfırlayırıq
        userHasRated = false;
        userCurrentScore = 0;
        renderStars(0);

        // 1. Kursun cari reytinqini çəkin
        try {
            const res = await fetch(`${API_URL}/course-rating/${courseId}`);
            const data = await res.json();
            // Orta balı göstərin
            ratingMessage.textContent = `Kursun cari orta balı: ${data.averageRating.toFixed(1)} (${data.count} səs)`;
        } catch (e) {
            console.error("Orta Reytinq yüklənmədi:", e);
            ratingMessage.textContent = "Orta Reytinq məlumatları yüklənmədi.";
        }

        if (!token) {
            ratingMessage.textContent += " | Reytinq vermək üçün daxil olun.";
            starRatingDiv.style.pointerEvents = 'auto';
            return;
        }

        // 2. İstifadəçinin Şəxsi Reytinqini çəkmək (Əsas Düzəliş)
        try {
            // Serverinizdə bu endpointi yaratdığınızı fərz edirik!
            const userRes = await fetch(`${API_URL}/user-rating/${courseId}`, {
                headers: { "Authorization": `Bearer ${token}` },
            });

            if (!userRes.ok) throw new Error("Şəxsi reytinq çəkilmədi.");

            const userData = await userRes.json();

            userHasRated = userData.hasRated;
            userCurrentScore = userData.score;

            if (userHasRated) {
                renderStars(userCurrentScore); // İstifadəçinin verdiyi balı göstər
                ratingMessage.textContent += ` | Sizin balınız: ${userCurrentScore}. Artıq reytinq vermisiniz.`;
                starRatingDiv.style.pointerEvents = 'none'; // Reytinq verilibsə klikləməni əngəllə
            } else {
                renderStars(0);
                starRatingDiv.style.pointerEvents = 'auto'; // Reytinq verməyə icazə ver
            }

        } catch (e) {
            console.error("Şəxsi Reytinq yüklənmədi:", e);
            // Əgər xəta olarsa, istifadəçi reytinq verməyib kimi qəbul edirik
            userHasRated = false;
            renderStars(0);
            starRatingDiv.style.pointerEvents = 'auto';
        }
    }

    // Reytinq ulduzlarına klik event-lərini əlavə et
    stars.forEach(star => {
        star.addEventListener('click', () => {
            const score = parseInt(star.dataset.score);
            handleStarClick(score);
        });
        // Hover effekti: Hər hansı bir istifadəçi balını görməkdənsə, hover olunan balı göstəririk.
        star.addEventListener('mouseover', () => renderStars(parseInt(star.dataset.score)));
        star.addEventListener('mouseout', () => {
            // Hover bitəndə, istifadəçinin öz balını (və ya 0) göstər
            renderStars(userCurrentScore);
        });
    });
    // Ilk yuklenmede ulduzlari sifirla
    renderStars(0);


    // Qalan Şərh funksiyaları (dəyişməz qalır)
    async function loadComments(postId, videoIndex) {
        commentsList.innerHTML = "Şərhlər yüklənir...";
        commentsSection.style.display = "flex";
        ratingSection.style.display = "block";

        try {
            const response = await fetch(`${API_URL}/comments/${postId}/${videoIndex}`);

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `Serverdən xəta: Status ${response.status}`);
            }

            const comments = await response.json();

            commentsList.innerHTML = "";

            if (comments.length === 0) {
                commentsList.innerHTML = "<p>Bu video üçün hələ şərh yoxdur.</p>";
                return;
            }

            comments.forEach(c => {
                const commentDiv = document.createElement("div");
                commentDiv.className = "comment";

                let date;
                if (c.createdAt && c.createdAt._seconds) {
                    date = new Date(c.createdAt._seconds * 1000).toLocaleDateString("az-AZ", {
                        year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit'
                    });
                } else {
                    date = 'N/A';
                }

                commentDiv.innerHTML = `
                    <div class="profil">
                        <span>${c.username[0]}</span>
                        <strong>${c.username}</strong>
                    </div>
                    <div class="comment-main">
                        <p> ${c.text}</p>
                        <small>${date}</small>
                    </div>
                `;
                commentsList.appendChild(commentDiv);
            });

        } catch (error) {
            console.error("Şərhləri yükləmə xətası:", error);
            commentsList.innerHTML = `<p style="color: red;">Şərhləri yükləyərkən xəta baş verdi: ${error.message}.</p>`;
        }
    }


    async function submitComment() {
        const token = localStorage.getItem('token');
        const text = commentTextarea.value.trim();

        if (!token) {
            Swal.fire("Daxil Olun", "Şərh yazmaq üçün daxil olmalısınız.", "warning");
            return;
        }

        if (text === "") {
            Swal.fire("Boş Mətn", "Şərh mətni boş ola bilməz.", "error");
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
                    videoIndex: currentVideoIndex,
                    text,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                Swal.fire("Uğurlu!", data.message, "success");
                commentTextarea.value = "";
                loadComments(post.id, currentVideoIndex);
            } else {
                Swal.fire("Xəta", `Şərh göndərilmədi: ${data.message}`, "error");
            }
        } catch (error) {
            console.error("Şərh göndərmə xətası:", error);
            Swal.fire("Server Xətası", "Şərh göndərilərkən server xətası baş verdi.", "error");
        } finally {
            submitButton.disabled = false;
        }
    }

    // Ilk yüklənməni və ulduzları yükləyən funksiya
    function loadInitialData() {
        if (post.videos.length > 0) {
            video.src = post.videos[0];
            currentVideoIndex = 0;
            loadComments(post.id, 0);
            loadUserRating(post.id); // Reytinq məlumatlarını yüklə
        }
    }

    // Video Playlisti və Event Listenerləri
    const videoThumbnails = [];

    post.videos.forEach((v, i) => {
        const div = document.createElement("div");
        div.className = "video-thumbnail";
        const coverUrl = post.videoCovers[i] || post.courseCover;
        const titleText = post.videoTitles[i] || "Başlıq yoxdur";

        div.innerHTML =
            `
        <input type="checkbox" />
        <img class="img" src ="${coverUrl}">
        <span>${titleText}</span> 
      `;

        videoThumbnails.push(div);
        list.appendChild(div);

        if (i === 0) {
            div.style.backgroundColor = "#f0f0f0";
        } else {
            div.style.backgroundColor = "#fff";
        }

        div.addEventListener("click", () => {
            video.src = v;
            video.play();
            currentVideoIndex = i;

            loadComments(post.id, currentVideoIndex);

            loadUserRating(post.id);

            videoThumbnails.forEach(item => {
                item.style.backgroundColor = "#fff";
            });
            div.style.backgroundColor = "#f0f0f0";
        });
    });

    loadInitialData();


    submitButton.addEventListener("click", submitComment);

    const logo = document.querySelector(".logo")

    logo.addEventListener("click", () => {
        window.location.href = "../index.html"
    })

    let buttons = document.querySelectorAll(".btn");
    let comments = document.getElementById("comments-section");
    let rating = document.getElementById("rating-section");


    buttons.forEach((btn, i) => {

        btn.addEventListener("click", () => {

            buttons.forEach(item => {
                item.style.cssText = `border: none; color: #2a2b3f7c`
            });

            btn.style.cssText = `border-bottom: 2px solid #2da0fd; color: #000;`;

            comments.style.display = "none";
            rating.style.display = "none";

            if (i === 0) {
                console.log("Search kliklendi");
            } else if (i === 1) {
                console.log("Ümumi baxış kliklendi");

            } else {
                comments.style.display = "flex"
                rating.style.display = "block"
            }
        })
    })

    document.getElementById("comments").click();

}


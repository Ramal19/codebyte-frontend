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

    let currentVideoIndex = 0;


    async function loadComments(postId, videoIndex) {
        commentsList.innerHTML = "Şərhlər yüklənir...";

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
                    videoIndex: currentVideoIndex,
                    text,
                }),
            });

            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                commentTextarea.value = "";
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


    if (post.videos.length > 0) {
        video.src = post.videos[0];
        loadComments(post.id, 0);
    }

    submitButton.addEventListener("click", submitComment);


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

        // Yeni elementi massivə əlavə edirik
        videoThumbnails.push(div);
        list.appendChild(div);

        // İlk video aktiv olaraq işarələnməlidir
        if (i === 0) {
            div.style.backgroundColor = "#f0f0f0"; // Başlanğıc rəng
        } else {
            div.style.backgroundColor = "#fff";
        }

        div.addEventListener("click", () => {
            video.src = v;
            video.play();
            currentVideoIndex = i;

            loadComments(post.id, currentVideoIndex);

            // --- ƏSAS HƏLL: Bütün aktivləri sıfırla və yenisini vurğula ---

            // Bütün elementlərin rəngini sıfırla (ağ et)
            videoThumbnails.forEach(item => {
                item.style.backgroundColor = "#fff";
            });

            // Yalnız kliklənən elementin rəngini dəyiş (boz et)
            div.style.backgroundColor = "#f0f0f0";

            // ----------------------------------------------------------------
        });
    });
}

const logo = document.querySelector(".logo")

logo.addEventListener("click", () => {
    window.location.href = "../index.html"
})

let buttons = document.querySelectorAll(".btn");
let comments = document.querySelector(".comments-section-container");
let commentsDisplay = getComputedStyle(comments).display;


buttons.forEach((btn, i) => {

    buttons[i].addEventListener("click", () => {

        buttons.forEach(item => {
            item.style.cssText = `border: none; color: #2a2b3f7c`
        });

        btn.style.cssText = `border-bottom: 2px solid #2da0fd; color: #000;`;

        if (i === 0) {
            console.log("seacrh");
        } else if (i === 1) {

            console.log(post.text);

        } else {
            comments.style.display = "flex"


        }
    })
})

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

// const currentUsername = "VasifB";
// const currentUserID = "123456";

// const mainVideo = document.getElementById("main-video");
// const overlay = document.getElementById("video-overlay");
// const overlayImage = document.getElementById("overlay-image");
// const overlayText = document.getElementById("overlay-text");


// function generateAndDownloadImage() {
//     const canvas = document.createElement('canvas');
//     canvas.width = 640;
//     canvas.height = 360;
//     const ctx = canvas.getContext('2d');

//     ctx.fillStyle = '#FF0000';
//     ctx.fillRect(0, 0, canvas.width, canvas.height);

//     ctx.fillStyle = 'white';
//     ctx.font = '24px Arial';
//     ctx.textAlign = 'center';

//     const time = new Date().toLocaleString();

//     ctx.fillText("QADAĞANDIR: Ekran Qeydi Aşkarlandı!", canvas.width / 2, 100);
//     ctx.fillText(`İstifadəçi: ${currentUsername} | ID: ${currentUserID}`, canvas.width / 2, 150);
//     ctx.fillText(`Vaxt: ${time}`, canvas.width / 2, 200);

//     const dataURL = canvas.toDataURL('image/png');

//     const link = document.createElement('a');
//     link.href = dataURL;
//     link.download = `Siz_Qeyd_Etdiniz_${currentUserID}_${Date.now()}.png`;

//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link);

//     console.warn("Ekran Qeydi Cəhdi Aşkarlandı. Şəxsi Məlumatlar Yükləndi.");
// }


// function handleVisibilityChange() {
//     if (document.hidden) {
//         mainVideo.pause();
//         overlay.style.display = 'flex';
//         overlayText.textContent = "Video dayandırıldı. Lütfən, bu pəncərəyə qayıdın.";


//     } else {
//         overlay.style.display = 'none';
//         mainVideo.play();
//     }
// }

// document.addEventListener('visibilitychange', handleVisibilityChange);

// window.addEventListener('blur', () => {
//     mainVideo.pause();
//     overlay.style.display = 'flex';
//     overlayText.textContent = "Diqqət: Video pəncərə aktivliyini itirdi!";
// });

// window.addEventListener('focus', () => {
//     overlay.style.display = 'none';
//     mainVideo.play();
// });


// mainVideo.addEventListener('contextmenu', (event) => event.preventDefault());
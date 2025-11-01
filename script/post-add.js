// const token = localStorage.getItem("token");
// if (!token) {
//     console.log("Əvvəlcə login olmalısınız");
//     window.location.href = "login.html";
// }

// const postsDiv = document.getElementById("posts");

// function parseJwt(t) {
//     return JSON.parse(atob(t.split('.')[1]));
// }

// async function loadPosts() {
//     const res = await fetch("https://codebyte-backend-ibyq.onrender.com/posts");
//     const posts = await res.json();
//     postsDiv.innerHTML = "";

//     // 🔹 Daxil olan istifadəçinin username-i
//     const me = parseJwt(token).username;

//     // 🔹 Yalnız həmin istifadəçinin paylaşımları
//     const myPosts = posts.filter(p => p.username === me);

//     // 🔹 Ən son paylaşılan birinci görünsün
//     myPosts.reverse().forEach(p => {
//         const div = document.createElement("div");
//         div.className = "post-card";
//         div.innerHTML = `
//           <img src="https://codebyte-backend-ibyq.onrender.com/uploads/${p.cover}" alt="Qapaq şəkil">
//           <p><b>${p.username}</b></p>
//           <p>${p.text}</p>

//         `;

//         if (postsDiv.children.length > 5) {

//             postsDiv.style.cssText = `overflow-x: scroll;overflow-y: hidden;`
//         }

//         // 🔹 Video açmaq
//         div.onclick = () => {
//             const videoWindow = window.open("", "_blank");
//             videoWindow.document.write(`
//               <video src="https://codebyte-backend-ibyq.onrender.com/uploads/${p.video}" controls autoplay style="width:100%; height:500px;"></video>
//             `);
//         };

//         // 🔹 Postu silmək
//         const btn = document.createElement("button");
//         btn.textContent = "Sil";
//         btn.onclick = (e) => {
//             e.stopPropagation();
//             deletePost(p.id);
//         };
//         div.appendChild(btn);

//         postsDiv.appendChild(div);
//     });
// }

// async function deletePost(id) {
//     try {
//         const res = await fetch(`https://codebyte-backend-ibyq.onrender.com/posts/${id}`, {
//             method: "DELETE",
//             headers: {
//                 "Authorization": "Bearer " + token
//             }
//         });

//         if (!res.ok) {
//             const err = await res.json();
//             alert("Xəta: " + (err.message || "Post silinə bilmədi"));
//             return;
//         }

//         loadPosts();
//     } catch (error) {
//         console.error(error);
//         alert("Server ilə əlaqə alınmadı");
//     }
// }

// document.getElementById("uploadBtn").addEventListener("click", async () => {
//     const video = document.getElementById("videoInput").files[0];
//     const cover = document.getElementById("coverInput").files[0];
//     const text = document.getElementById("textInput").value;

//     if (!video) return alert("Video seçin");
//     if (!cover) return alert("Qapaq şəkil seçin");
//     if (!text) return alert("Text yaz");

//     const formData = new FormData();
//     formData.append("video", video);
//     formData.append("cover", cover);
//     formData.append("text", text);

//     await fetch("https://codebyte-backend-ibyq.onrender.com/posts", {
//         method: "POST",
//         headers: { "Authorization": "Bearer " + token },
//         body: formData
//     });

//     loadPosts();
// });

// // document.getElementById("logoutBtn").onclick = () => {
// //     localStorage.removeItem("token");
// //     location.href = "login.html";
// // };

// loadPosts();

// // Fayl seçildikdə önizləmə göstərmək
// const videoInput = document.getElementById("videoInput");
// const coverInput = document.getElementById("coverInput");
// const videoPreview = document.getElementById("videoPreview");
// const coverPreview = document.getElementById("coverPreview");

// videoInput.addEventListener("change", () => {
//     const file = videoInput.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//         videoPreview.src = e.target.result;
//         videoPreview.style.visibility = "visible";
//     };
//     reader.readAsDataURL(file);
// });

// coverInput.addEventListener("change", () => {
//     const file = coverInput.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (e) => {
//         coverPreview.src = e.target.result;
//         coverPreview.style.visibility = "visible";
//     };
//     reader.readAsDataURL(file);
// });


const token = localStorage.getItem("token");
if (!token) {
    alert("Əvvəlcə login olmalısınız");
    window.location.href = "login.html";
}

const addMoreVideoBtn = document.getElementById("addMoreVideo");
const videosContainer = document.getElementById("videosContainer");
const uploadCourseBtn = document.getElementById("uploadCourseBtn");

addMoreVideoBtn.addEventListener("click", () => {
    const div = document.createElement("div");
    div.className = "video-item";
    div.innerHTML = `
    <input type="file" class="videoInput" accept="video/*">
    <input type="file" class="thumbInput" accept="image/*">
    <input type="text" class="videoTitle" placeholder="Videonun başlığı">
  `;
    videosContainer.appendChild(div);
});

// Ümumi qapaq şəkil önizləməsi
const courseCoverInput = document.getElementById("courseCover");
const courseCoverPreview = document.getElementById("courseCoverPreview");

courseCoverInput.addEventListener("change", () => {
    const file = courseCoverInput.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = e => {
        courseCoverPreview.src = e.target.result;
        courseCoverPreview.style.visibility = "visible";
    };
    reader.readAsDataURL(file);
});

uploadCourseBtn.addEventListener("click", async () => {
    const title = document.getElementById("courseTitle").value.trim();
    const category = document.getElementById("categorySelect").value;
    const cover = courseCoverInput.files[0];

    if (!title || !category || !cover) {
        alert("Bütün məlumatları doldurun!");
        return;
    }

    const videos = [];
    document.querySelectorAll(".video-item").forEach((div, index) => {
        const videoFile = div.querySelector(".videoInput").files[0];
        const thumbFile = div.querySelector(".thumbInput").files[0];
        const videoTitle = div.querySelector(".videoTitle").value.trim();

        if (!videoFile || !thumbFile || !videoTitle) return;

        videos.push({ videoFile, thumbFile, videoTitle });
    });

    if (videos.length === 0) {
        alert("Ən azı bir video əlavə edin!");
        return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);
    formData.append("courseCover", cover);

    videos.forEach(v => {
        formData.append("videos", v.videoFile);
        formData.append("videoCovers", v.thumbFile);
    });

    formData.append("text", title);
    formData.append("category", category);


    const res = await fetch("https://codebyte-backend-ibyq.onrender.com/posts", {
        method: "POST",
        headers: { "Authorization": "Bearer " + token },
        body: formData
    });

    if (!res.ok) {
        const err = await res.json();
        alert("Xəta: " + (err.message || "Kurs yüklənmədi"));
        return;
    }

    alert("Kurs uğurla əlavə olundu!");
    window.location.href = "../index.html";
});

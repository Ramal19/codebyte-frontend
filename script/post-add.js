
const API_URL = "https://codebyte-backend-ibyq.onrender.com";
const token = localStorage.getItem("token");
if (!token) {
  alert("Əvvəlcə login olmalısınız");
  window.location.href = "login.html";
}

const logo = document.querySelector(".logo")

logo.addEventListener("click", () => {

  window.location.href = "../index.html"
})


const addMoreVideoBtn = document.getElementById("addMoreVideo");
const videosContainer = document.getElementById("videosContainer");
const uploadCourseBtn = document.getElementById("uploadCourseBtn");
const courseCoverInput = document.getElementById("courseCover");
const courseCoverPreview = document.getElementById("courseCoverPreview");

addMoreVideoBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "video-item";
  div.innerHTML =
    `
    <input type="file" class="videoInput" accept="video/*">
    <input type="file" class="thumbInput" accept="image/*">
    <input type="text" class="videoTitle" placeholder="Videonun başlığı">
  `;
  videosContainer.appendChild(div);
});

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
  document.querySelectorAll(".video-item").forEach(div => {

    Swal.fire({
      title: "Yüklənir...",
      html: "Sorğunuzu emal edərkən bir az gözləyin.",
      allowOutsideClick: false, 
      allowEscapeKey: false,   
      showConfirmButton: false
    });

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
  formData.append("text", title);
  formData.append("category", category);
  formData.append("courseCover", cover);

  videos.forEach(v => {
    formData.append("videos", v.videoFile);
    formData.append("videoCovers", v.thumbFile);
  });

  formData.append("videoTitles", JSON.stringify(videos.map(v => v.videoTitle)));
  console.log("formData-nın bütün elementləri:");
  for (const pair of formData.entries()) {
    console.log(pair[0], pair[1]);
  }

  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData
    });

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Kurs yüklənmədi" }));
      alert("Xəta: " + err.message);
      return;
    }

    const data = await res.json();

    alert("Kurs uğurla əlavə olundu!");

    // console.log("Yeni kurs:", data);
    window.location.href = "../index.html";
  } catch (error) {
    alert("Xəta baş verdi: " + error.message);
    console.error(error);
  }
});
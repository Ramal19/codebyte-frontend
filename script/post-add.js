const API_URL = "https://codebyte-backend-ibyq.onrender.com";
const BASE_URL = `${API_URL}/uploads`;

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
  document.querySelectorAll(".video-item").forEach(div => {
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

  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData
    });

    if (!res.ok) {
      let errText = "Kurs yüklənmədi";
      try {
        const err = await res.json();
        if (err.message) errText = err.message;
      } catch {}
      alert("Xəta: " + errText);
      return;
    }

    let data = null;
    try {
      data = await res.json();
    } catch {
      data = null;
    }

    alert("Kurs uğurla əlavə olundu!");

    if (data) {
      if (data.courseCover)
        console.log("Cover URL:", `${BASE_URL}/${data.courseCover}`);

      if (Array.isArray(data.videos) && data.videos.length > 0)
        console.log("Video URL:", `${BASE_URL}/${data.videos[0]}`);

      if (Array.isArray(data.videoCovers) && data.videoCovers.length > 0)
        console.log("Video cover URL:", `${BASE_URL}/${data.videoCovers[0]}`);
    }

    window.location.href = "../index.html";
  } catch (error) {
    alert("Xəta baş verdi: " + error.message);
    console.error(error);
  }
});

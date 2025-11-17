const API_URL = "https://codebyte-backend-ibyq.onrender.com";
// QEYD: API_URL dəyişəni serverinizin real URL ünvanı ilə əvəz olunmalıdır.

const token = localStorage.getItem("token");
if (!token) {
  alert("Əvvəlcə login olmalısınız");
  window.location.href = "login.html";
}

const logo = document.querySelector(".logo");

logo.addEventListener("click", () => {
  window.location.href = "../index.html";
});

const addMoreVideoBtn = document.getElementById("addMoreVideo");
const videosContainer = document.getElementById("videosContainer");
const uploadCourseBtn = document.getElementById("uploadCourseBtn");
const courseCoverInput = document.getElementById("courseCover");
const courseCoverPreview = document.getElementById("courseCoverPreview");

const MAX_VIDEO_SIZE = 100 * 1024 * 1024; // 100 MB
const MAX_IMAGE_SIZE = 5 * 1024 * 1024;   // 5 MB

// --- ƏSAS ŞƏKİL PREVYEW VƏ ÖLÇÜ YOXLAMASI ---
courseCoverInput.addEventListener("change", () => {
  const file = courseCoverInput.files[0];
  if (!file) return;

  if (file.size > MAX_IMAGE_SIZE) {
    Swal.fire({
      icon: "error",
      title: "Şəkil çox böyükdür!",
      text: "Maksimum ölçü 5 MB ola bilər.",
    });
    courseCoverInput.value = "";
    return;
  }

  const reader = new FileReader();
  reader.onload = e => {
    courseCoverPreview.src = e.target.result;
    courseCoverPreview.style.visibility = "visible";
  };
  reader.readAsDataURL(file);
});

// --- ƏLAVƏ VİDEO SAHƏLƏRİNİ ƏLAVƏ ETMƏK ---
addMoreVideoBtn.addEventListener("click", () => {
  const div = document.createElement("div");
  div.className = "video-item";
  div.innerHTML =
    `
        <input type="file" class="videoInput" accept="video/*">
        <input type="file" class="thumbInput" accept="image/*">
        <input type="text" class="videoTitle" placeholder="Videonun başlığı">
        <input type="number" id="coursePrice" placeholder="Qiyməti daxil edin (0 - pulsuz)">

    `;
  videosContainer.appendChild(div);

  const videoInput = div.querySelector(".videoInput");
  const thumbInput = div.querySelector(".thumbInput");

  videoInput.addEventListener("change", () => {
    const file = videoInput.files[0];
    if (file && file.size > MAX_VIDEO_SIZE) {
      Swal.fire({
        icon: "warning",
        title: "Video çox böyükdür!",
        text: "Maksimum ölçü 100 MB ola bilər.",
      });
      videoInput.value = "";
    }
  });

  thumbInput.addEventListener("change", () => {
    const file = thumbInput.files[0];
    if (file && file.size > MAX_IMAGE_SIZE) {
      Swal.fire({
        icon: "warning",
        title: "Şəkil çox böyükdür!",
        text: "Maksimum ölçü 5 MB ola bilər.",
      });
      thumbInput.value = "";
    }
  });
});

// --- KURSUN YÜKLƏNMƏSİ ---
uploadCourseBtn.addEventListener("click", async () => {
  const title = document.getElementById("courseTitle").value.trim();
  const category = document.getElementById("categorySelect").value;

  // 💡 YENİ: Qiymət inputunu oxu
  const priceInput = document.getElementById("coursePrice").value.trim();
  const cover = courseCoverInput.files[0];

  const price = Number(priceInput);

  // Başlıq, kateqoriya, qiymət və əsas şəklin boş olub-olmamasını yoxlayırıq
  if (!title || !category || !cover || priceInput === "") {
    Swal.fire({ icon: "warning", title: "Diqqət", text: "Kurs başlığı, qiyməti, kateqoriya və əsas şəkil mütləqdir!" });
    return;
  }

  // Qiymətin düzgün rəqəm formatında olmasını yoxlayırıq
  if (isNaN(price) || price < 0) {
    Swal.fire({ icon: "error", title: "Xəta", text: "Qiymət düzgün rəqəm formatında olmalıdır (mənfi ola bilməz)." });
    return;
  }

  const videos = [];
  let allValid = true; // Bütün videoların düzgün doldurulduğunu yoxlamaq üçün bayraq

  document.querySelectorAll(".video-item").forEach(div => {
    const videoFile = div.querySelector(".videoInput").files[0];
    const thumbFile = div.querySelector(".thumbInput").files[0];
    const videoTitle = div.querySelector(".videoTitle").value.trim();

    // Yoxlama: Əgər video elementləri yaranıbsa, mütləq doldurulmalıdır
    if (!videoFile || !thumbFile || !videoTitle) {
      // Yalnız bir sahə doludursa, bütün sahələr tələb olunur
      if (div.querySelector(".videoInput").value || div.querySelector(".thumbInput").value || videoTitle) {
        Swal.fire({
          icon: "error",
          title: "Doldurulmamış sahə!",
          text: "Əlavə etdiyiniz bütün videoların faylları (video və şəkil) və başlıqları olmalıdır."
        });
        allValid = false;
        return;
      }
      return; // Tamamilə boş elementləri atlayır
    }

    // Ölçü yoxlamaları
    if (videoFile.size > MAX_VIDEO_SIZE) {
      Swal.fire({ icon: "error", title: "Video çox böyükdür!", text: "Maksimum ölçü 100 MB ola bilər." });
      allValid = false;
      return;
    }

    if (thumbFile.size > MAX_IMAGE_SIZE) {
      Swal.fire({ icon: "error", title: "Şəkil çox böyükdür!", text: "Maksimum ölçü 5 MB ola bilər." });
      allValid = false;
      return;
    }

    videos.push({ videoFile, thumbFile, videoTitle });
  });

  // Əgər hər hansı bir video yoxlanışdan keçmədisə, funksiyanı dayandır
  if (!allValid) {
    return;
  }

  if (videos.length === 0) {
    Swal.fire({ icon: "warning", title: "Diqqət", text: "Ən azı bir video əlavə edin!" });
    return;
  }

  // 💡 DÜZƏLİŞ: Yüklənmə pəncərəsini datanı topladıqdan sonra açırıq
  Swal.fire({
    title: "Yüklənir...",
    html: "Fayllar Firebase Storage-ə yüklənir. Bir az gözləyin.",
    allowOutsideClick: false,
    allowEscapeKey: false,
    showConfirmButton: false,
    willOpen: () => {
      Swal.showLoading();
    }
  });

  const formData = new FormData();
  formData.append("text", title);
  formData.append("category", category);
  formData.append("price", price.toFixed(2)); // 💡 YENİ: Qiyməti əlavə et (2 onluq dəqiqliyi ilə)
  formData.append("courseCover", cover);

  videos.forEach(v => {
    formData.append("videos", v.videoFile);
    formData.append("videoCovers", v.thumbFile);
  });

  formData.append("videoTitles", JSON.stringify(videos.map(v => v.videoTitle)));

  console.log("formData-nın bütün elementləri (yoxlama üçün):");
  for (const pair of formData.entries()) {
    console.log(pair[0], (pair[1] instanceof File) ? pair[1].name : pair[1]);
  }

  try {
    const res = await fetch(`${API_URL}/posts`, {
      method: "POST",
      headers: { Authorization: "Bearer " + token },
      body: formData
    });

    Swal.close(); // Yüklənmə bitdi, pəncərəni bağla

    if (!res.ok) {
      const err = await res.json().catch(() => ({ message: "Bilinməyən Server Xətası" }));
      Swal.fire({
        icon: "error",
        title: "Xəta!",
        text: "Kurs yüklənmədi: " + err.message
      });
      return;
    }

    const data = await res.json();

    Swal.fire({
      icon: "success",
      title: "Kurs uğurla əlavə olundu!",
      showConfirmButton: false,
      timer: 2000
    });

    window.location.href = "../index.html";
  } catch (error) {
    Swal.close();
    Swal.fire({
      icon: "error",
      title: "Əlaqə xətası!",
      text: "Serverə qoşularkən xəta baş verdi: " + error.message,
    });
    console.error("Əlaqə xətası:", error);
  }
});
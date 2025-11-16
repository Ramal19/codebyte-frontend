
const API_URL = "https://codebyte-backend-ibyq.onrender.com";

const post = JSON.parse(localStorage.getItem("selectedPost"));


console.log(post.videos[0].duration);



if (!post) {
    document.body.innerHTML = "<h3>Kurs tapılmadı</h3>";
} else {
    document.getElementById("course-title").textContent = post.text;

    const video = document.getElementById("main-video");
    const list = document.getElementById("video-list");

    if (post.videos.length > 0) {
        video.src = post.videos[0];
    }

    post.videos.forEach((v, i) => {

        
        
        const div = document.createElement("div");

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
        });
        list.appendChild(div);
    });
}

const logo = document.querySelector(".logo")

logo.addEventListener("click", () => {

    window.location.href = "../index.html"
})

// window.addEventListener("beforeunload", () => {
//     localStorage.removeItem("selectedPost");
// });
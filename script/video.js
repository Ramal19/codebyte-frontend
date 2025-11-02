const post = JSON.parse(localStorage.getItem("selectedPost"));
if (!post) {
    document.body.innerHTML = "<h3>Kurs tapılmadı</h3>";
} else {
    document.getElementById("course-title").textContent = post.text;

    const video = document.getElementById("main-video");
    const list = document.getElementById("video-list");

    if (post.videos.length > 0) {
        video.src = `http://localhost:3000/uploads/${post.videos[0]}`;
    }

    post.videos.forEach((v, i) => {
        // const img = document.createElement("img");
        // img.src = `http://localhost:3000/uploads/${post.videoCovers[i] || post.courseCover}`;
        const div = document.createElement("div");

        div.innerHTML = 
        `
            <h2>${post.text}</h2>
            <img class="img" src ="http://localhost:3000/uploads/${post.videoCovers[i] || post.courseCover}">
        `

        // const img = document.querySelectorAll(".img");


        div.addEventListener("click", () => {
            video.src = `http://localhost:3000/uploads/${v}`;
            video.play();
        });
        list.appendChild(div);
    });
}

const logo = document.querySelector(".logo")

logo.addEventListener("click", () => {

    window.location.href = "../index.html"
})
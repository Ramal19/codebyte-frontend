const postsDiv = document.getElementById("posts");
const btnDirection = document.querySelector(".btn-direction")
const API_URL = "https://codebyte-backend-ibyq.onrender.com";

async function loadPosts() {
    try {
        const res = await fetch(`${API_URL}/posts`);
        const posts = await res.json();

        if (!posts || posts.length === 0) {
            postsDiv.innerHTML = `
            <p 
                style="
                    font-size: 20px; 
                    color: gray; 
                    text-align: center;
                    padding: 30px 0;
            ">
                Hazırda heç bir kurs yoxdur.
            </p>`;
            return;
        }

        postsDiv.innerHTML = "";
        posts.reverse().forEach(p => {
            const div = document.createElement("div");
            div.classList.add("lesson-card")

            let tarix = p.createdAt.slice(0, 10);
            let tersTarix = tarix.split("-").reverse().join("-");

            div.innerHTML = `
                <img src="${API_URL}/uploads/${p.courseCover}" alt="Post şəkli">
                <div class="card-text">
                    <h3>${p.text || ""}</h3>
                    <span>${p.username}</span>
                    <span>${tersTarix}</span>
                </div>
          `;



            div.addEventListener("click", () => {
                localStorage.setItem("selectedPost", JSON.stringify(p));
                window.location.href = "./video.html";
            });

            postsDiv.appendChild(div);

            if (postsDiv.children.length > 6) {
                postsDiv.style.cssText =
                    `
                 overflow-X: scroll;
                 overflow-Y: hidden;
                `

                let btnLeft = document.querySelector(".btn-left");
                let btnRight = document.querySelector(".btn-right");

                if (!btnLeft) {
                    btnLeft = document.createElement("button");
                    btnLeft.classList.add("btn-left");
                    btnLeft.innerHTML = `<i class="bi bi-arrow-left"></i>`;
                    // btnDirection.appendChild(btnLeft);
                }

                if (!btnRight) {
                    btnRight = document.createElement("button");
                    btnRight.classList.add("btn-right");
                    btnRight.innerHTML = `<i class="bi bi-arrow-right"></i>`;
                    // btnDirection.appendChild(btnRight);
                }


                let step = 200;
                btnLeft.addEventListener("click", () => {

                    postsDiv.scrollBy({
                        left: -step,
                        behavior: 'smooth'
                    })
                })

                btnRight.addEventListener("click", () => {
                    postsDiv.scrollBy({
                        left: step,
                        behavior: 'smooth'
                    })
                })

                // btnLeft.innerHTML = `<i class="bi bi-arrow-left"></i>`
                // btnRight.innerHTML = `<i class="bi bi-arrow-right"></i>`

                // btnLeft.classList.add("btn-left");
                // btnRight.classList.add("btn-right");

                btnDirection.appendChild(btnLeft);
                btnDirection.appendChild(btnRight);



            }

        });
    } catch (err) {
        console.error("Postlar yüklənərkən xəta:", err);
    }
}

loadPosts();
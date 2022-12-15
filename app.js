const container = document.querySelector(".wrapper");

for (let i = 0; i < 256; i++) {
    const div = document.createElement("div");
    div.classList.add("box");
    container.appendChild(div);
}
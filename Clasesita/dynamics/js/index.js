let player;
let currentVideo = null;
let playerReady = false;

function crearTarjeta(video) {
    const canal = data.canales.find((c) => c.id === video.id_canal);

    const tarjeta = document.createElement("div");
    tarjeta.className = "tarjeta-video";
    tarjeta.setAttribute("data-id", video.id);

    tarjeta.innerHTML = `
    <div class="thumb">
      <img src="${video.link_img}" alt="Miniatura">
    </div>
    <div class="info">
      <h3>${video.nombre}</h3>
      <p>${canal.nombre} • ${video.duracion}</p>
    </div>
    <div class="like-container">
      <span class="like-count">0</span>
      <span class="dislike-count">0</span>
    </div>`;

    
    let div = document.createElement("div");
    div.innerHTML= `
        <div class="acciones">
            <button data-id="${video.id}" data-accion="pin"><i class="fa-solid fa-thumbtack"></i></button>
            <button data-id="${video.id}" data-accion="guardar"><i class="fa-solid fa-bookmark"></i></button>
            <button data-id="${video.id}" data-accion="like"><i class="fa-solid fa-heart"></i></button>
            <button data-id="${video.id}" data-accion="dislike"><i class="fa-solid fa-heart-crack"></i></button>
            <button data-id="${video.id}" data-accion="eliminar"><i class="fa-solid fa-trash"></i></button>
            <button data-id="${video.id}" data-accion="ocultar"><i class="fa-solid fa-eye-slash"></i></button>
        </div>
        `;
    div.addEventListener("click", (e) => {
        const accion = e.target.closest("button")?.dataset?.accion;
        const tarjeta = e.target.closest(".tarjeta-video");

        if (!tarjeta) return;

        const videoId = parseInt(tarjeta.dataset.id);
        const video = data.videos.find((v) => v.id === videoId);

        // Botones especiales
        if (accion) {
            e.stopPropagation();
            switch (accion) {
                case "pin":
                    tarjeta.parentElement.prepend(tarjeta);
                    break;
                case "guardar":
                    e.target.closest("button").classList.toggle("activo");
                    break;
                case "like":
                    const like = tarjeta.querySelector(".like-count");
                    console.log(like)
                    const actual = parseInt(like.textContent);
                    console.log(actual)
                    like.textContent = `${actual + 1}`;
                    break;
                case "dislike":
                    const dislike = tarjeta.querySelector(".dislike-count");
                    const act = parseInt(dislike.textContent);
                    dislike.textContent = `${act + 1}`;
                    break;
                case "eliminar":
                    tarjeta.remove();
                    break;
                case "ocultar":
                    tarjeta.style.opacity = 0.3;
                    break;
            }
        } else {
            reproducirVideo(video);
        }
    });
    tarjeta.appendChild(div);

    return tarjeta;
}

function cargarVideos() {
    const contenedor = document.getElementById("contenedorVideos");
    contenedor.innerHTML = "";

    data.videos.forEach((video) => {
        const tarjeta = crearTarjeta(video);
        contenedor.appendChild(tarjeta);
    });
}

function reproducirVideo(video) {
    document.getElementById("contenedorVideos").style.display = "none";
    document.getElementById("sugeridos").style.display = "none";
    document.getElementById("playerView").style.display = "flex";

    document.getElementById("tituloVideo").innerText = video.nombre;
    document.getElementById("descripcionVideo").innerText = video.descripcion;

    currentVideo = video;

    if (playerReady && player) {
        player.loadVideoById(video.link);
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("reproductor", {
        // height: "100%",
        // width: "100%",
        videoId: "",
        playerVars: {
            controls: 1,
        },
        events: {
            onReady: (event) => {
                playerReady = true;
                if (currentVideo) {
                    player.loadVideoById(currentVideo.link);
                }
            },
        },
    });
}

// Delegación de eventos


cargarVideos();

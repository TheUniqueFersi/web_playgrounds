let player;
let duration = 0;
let lastVolume = 100;
let previousVolume;
let updateInterval;

const seekBar = document.getElementById("seekBar");
const volumeSlider = document.getElementById("volumeSlider");
const playPauseBtn = document.getElementById("playPausebtn");
const muteBtn = document.getElementById("muteBtn");

const vidDuration = document.getElementById("duration");
const currentTimeSpan = document.getElementById("currentTime");
let currentVolume

function onPlayerReady(event) {
    duration = player.getDuration();
    player.mute(); // empieza en mute para evitar bloqueo de autoplay
    player.playVideo();

    previousVolume = player.getVolume();
    volumeSlider.value = previousVolume;
    seekBar.max = duration;

    updateInterval = setInterval(() => {
        if (player && player.getPlayerState() === YT.PlayerState.PLAYING) {
            seekBar.value = player.getCurrentTime();
        }

        // Detecta cambio externo de volumen y actualiza el slider
        currentVolume = player.getVolume();
        if (currentVolume !== previousVolume) {
            volumeSlider.value = currentVolume;
            previousVolume = currentVolume;
        }

    }, 100);
}

function onPlayerStateChange(event){
    if (event.data == YT.PlayerState.PLAYING) {
        // btnPausa.innerHTML = ICON_PAUSE;
        playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    } 
    else if (event.data == YT.PlayerState.PAUSED || event.data == YT.PlayerState.ENDED) {
        // reproduciendo = false;
        playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
        // btnPausa.innerHTML = ICON_PLAY;
    }
    if (event.data === YT.PlayerState.ENDED) {
        clearInterval(updateInterval);
    }
}

function onYouTubeIframeAPIReady() {
    player = new YT.Player("player", {
        videoId: "T8TtE-enslA",
        playerVars: {
            controls: 0,
            modestbranding: 1,
            rel: 0,
            showinfo: 0,
        },
        events: {
            onReady: onPlayerReady,
            'onStateChange': onPlayerStateChange
        },
    });
}


//Play/Pause
playPauseBtn.addEventListener("click", () => {
    let state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) {
        player.pauseVideo();
        playPauseBtn.innerHTML = `<i class="fa-solid fa-play"></i>`;
    } else {
        player.playVideo();
        playPauseBtn.innerHTML = `<i class="fa-solid fa-pause"></i>`;
    }
});

// Control de volumen con slider
volumeSlider.addEventListener("input", () => {
    const volume = parseInt(volumeSlider.value, 10);
    player.setVolume(volume);

    // Si estaba muteado y se mueve el slider, se desmutea
    if (player.isMuted() && volume > 0) {
        player.unMute();
    }

    lastVolume = volume;
    previousVolume = volume;
});

// Mute/Unmute con botón
muteBtn.addEventListener("click", () => {
    if (player.isMuted()) {
        player.unMute();
        muteBtn.innerHTML = `<i class="fa-solid fa-volume-off"></i>`;
        volumeSlider.value = lastVolume;
    } else {
        player.mute();
        muteBtn.innerHTML = `<i class="fa-solid fa-volume-high"></i>`;
    }
});


// ⏩ Barra de duración (seek)
seekBar.addEventListener("input", () => {
    let seekTo = seekBar.value;
    console.log("AA")
    player.seekTo(seekTo, true);
});

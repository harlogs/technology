function applyYTSettings() {
    const video = document.querySelector("video");
    if (video) {
        video.loop = true;
        video.playbackRate = 0.25;

        // AUTO PLAY
        if (video.paused) video.play();

        // AUTO UNMUTE (Firefox blocks autoplay with sound unless you unmute manually)
        video.muted = false;
    }

    const playerContainer = document.querySelector("ytd-player");
    if (playerContainer && playerContainer.getPlayer) {
        const player = playerContainer.getPlayer();
        if (player) {
            player.setPlaybackQuality("tiny");           // 144p
            player.setPlaybackQualityRange("tiny");
        }
    }
}

setInterval(applyYTSettings, 1500);

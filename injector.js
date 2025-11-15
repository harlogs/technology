(function applySettings() {
    const video = document.querySelector("video");

    if (video) {
        video.loop = true;
        video.playbackRate = 0.25;
    }

    const p = document.querySelector("ytd-player");
    if (p && p.getPlayer) {
        let player = p.getPlayer();
        if (player) {
            player.setPlaybackQuality("tiny");
            player.setPlaybackQualityRange("tiny");
        }
    }
})();

// Reapply every 2 seconds (YouTube changes settings automatically)
setInterval(() => {
    const video = document.querySelector("video");

    if (video) {
        video.loop = true;
        video.playbackRate = 0.25;
    }

    const p = document.querySelector("ytd-player");
    if (p && p.getPlayer) {
        let player = p.getPlayer();
        if (player) {
            player.setPlaybackQuality("tiny");
            player.setPlaybackQualityRange("tiny");
        }
    }
}, 2000);

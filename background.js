const YT_URL = "https://www.youtube.com/watch?v=XvZc34GM-WM";
let windowIds = [];
let tabIds = [];

// Open 10 SEPARATE WINDOWS
async function openWindowsAndInject() {
  for (let i = 0; i < 10; i++) {
    let newWindow = await chrome.windows.create({
      url: YT_URL,
      focused: i === 0
    });

    let winId = newWindow.id;
    let tabId = newWindow.tabs[0].id;

    windowIds.push(winId);
    tabIds.push(tabId);

    console.log(`Created Window ${i + 1} with Tab ${tabId}`);

    // Inject YouTube control script
    setTimeout(() => {
      chrome.scripting.executeScript({
        target: { tabId: tabId },
        files: ["injector.js"]
      }).catch(err => console.log("Inject error:", err));
    }, 5000);
  }
}

// LOG VIDEO STATUS FOR ALL WINDOWS (MANUAL CALL)
function logAllStatus() {
  tabIds.forEach((tabId, index) => {
    chrome.scripting.executeScript(
      {
        target: { tabId: tabId },
        func: () => {
          const video = document.querySelector("video");
          if (!video) return { status: "NO VIDEO", url: location.href };

          const player = document.getElementById("movie_player");

          return {
            playing: !video.paused,
            speed: video.playbackRate,
            loop: video.loop,
            currentTime: video.currentTime.toFixed(1),
            duration: video.duration.toFixed(1),
            quality: player?.getPlaybackQuality?.() || "unknown",
            url: location.href
          };
        }
      },
      (result) => {
        if (!result || !result[0]) return;
        const d = result[0].result;

        console.log(
`=== WINDOW ${index + 1} ===
URL: ${d.url}
Playing: ${d.playing}
Speed: ${d.speed}
Loop: ${d.loop}
Time: ${d.currentTime} / ${d.duration}
Quality: ${d.quality}
===========================`
        );
      }
    );
  });
}

// Start: Open windows + inject script
openWindowsAndInject();

// You can manually call this from console:
// logAllStatus();

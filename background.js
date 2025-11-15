const YT_URL = "https://www.youtube.com/watch?v=XvZc34GM-WM";
let createdTabs = [];

// OPEN 10 YOUTUBE TABS
async function openTabsAndInject() {
  for (let i = 0; i < 10; i++) {
    let tab = await chrome.tabs.create({
      url: YT_URL,
      active: i === 0
    });

    createdTabs.push(tab.id);
    console.log(`Created Tab ${i + 1}: ${tab.url}`);

    setTimeout(() => {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["injector.js"]
      });
    }, 5000);
  }
}

// --- TAB SWITCHING + LOGGING ---
let currentIndex = 0;

function switchTabs() {
  if (!createdTabs.length) return;

  const tabId = createdTabs[currentIndex];

  chrome.tabs.update(tabId, { active: true });

  chrome.scripting.executeScript(
    {
      target: { tabId: tabId },
      func: () => {
        const video = document.querySelector("video");

        if (!video) {
          return {
            status: "NO VIDEO FOUND",
            url: location.href
          };
        }

        // Try to detect quality
        let quality = "unknown";
        const player = window.ytplayer?.config?.args;
        if (player?.adaptive_fmts) {
          const list = player.adaptive_fmts.split(",");
          if (list.length > 0) {
            const first = list[0];
            const itagMatch = first.match(/itag=(\d+)/);
            if (itagMatch) quality = itagMatch[1];
          }
        }

        return {
          playing: !video.paused,
          speed: video.playbackRate,
          loop: video.loop,
          currentTime: video.currentTime.toFixed(1),
          duration: video.duration.toFixed(1),
          quality,
          url: location.href
        };
      }
    },
    (result) => {
      if (!result || !result[0]) return;

      const data = result[0].result;

      console.log(
        `\n=== TAB ${currentIndex + 1} ===\n` +
        `URL: ${data.url}\n` +
        `Playing: ${data.playing}\n` +
        `Speed: ${data.speed}\n` +
        `Loop: ${data.loop}\n` +
        `Time: ${data.currentTime} / ${data.duration}\n` +
        `Quality (itag): ${data.quality}\n` +
        `===========================\n`
      );
    }
  );

  currentIndex = (currentIndex + 1) % createdTabs.length;
}

// Start Process
openTabsAndInject();

// Run every 1 minute
setInterval(switchTabs, 60000);

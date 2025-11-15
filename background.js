const YT_URL = "https://www.youtube.com/watch?v=XvZc34GM-WM";

browser.runtime.onInstalled.addListener(() => {
  console.log("YouTube Auto Multi Open ready");
});

// open 10 windows when extension is clicked
browser.action.onClicked.addListener(async () => {
  for (let i = 0; i < 10; i++) {
    const tab = await browser.tabs.create({
      url: YT_URL,
      active: false
    });

    // Wait for page to load, then inject script
    setTimeout(() => {
      browser.scripting.executeScript({
        target: { tabId: tab.id },
        files: ["injector.js"]
      });
    }, 4000);
  }
});

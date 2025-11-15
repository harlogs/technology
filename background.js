const YT_URL = "https://www.youtube.com/watch?v=XvZc34GM-WM";

browser.browserAction.onClicked.addListener(() => {
  console.log("Button clicked - opening windows...");

  for (let i = 0; i < 10; i++) {
    browser.tabs.create({
      url: YT_URL,
      active: false
    }).then(tab => {
      
      // Inject script after page loads
      setTimeout(() => {
        browser.tabs.executeScript(tab.id, {
          file: "injector.js"
        });
      }, 4000);

    });
  }
});
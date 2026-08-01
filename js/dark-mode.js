(function () {
  function setTheme(mode) {
    document.documentElement.setAttribute("data-theme", mode);
    document.documentElement.setAttribute("data-bs-theme", mode);
  }

  setTheme("dark");
  try {
    localStorage["dark-mode-storage"] = "dark";
  } catch (e) {}

  window.addEventListener("storage", function () {
    setTheme("dark");
  });
})();

(function(indexUrl) {
  window.addEventListener("DOMContentLoaded", function() {
    let index = null;
    let lookup = null;
    let queuedTerm = null;

    const form = document.getElementById("search");
    const input = document.getElementById("search-input");
    const panel = document.getElementById("search-results");
    if (!form || !input || !panel) {
      return;
    }

    let activeItem = -1;
    let items = [];

    function hidePanel() {
      panel.hidden = true;
      activeItem = -1;
    }

    function showPanel() {
      panel.hidden = false;
    }

    function render(term, results) {
      panel.textContent = "";
      items = [];

      if (!results.length) {
        const empty = document.createElement("div");
        empty.className = "search-drop-empty";
        empty.textContent = 'No results for "' + term + '"';
        panel.appendChild(empty);
        showPanel();
        return;
      }

      results.slice(0, 10).forEach(function(result) {
        const doc = lookup[result.ref];
        if (!doc) {
          return;
        }
        const a = document.createElement("a");
        a.className = "search-drop-item";
        a.href = doc.uri;

        const icon = document.createElement("span");
        icon.className = "search-drop-icon";
        const iconI = document.createElement("i");
        iconI.className = "bi bi-" + (doc.icon || "gear");
        icon.appendChild(iconI);

        const body = document.createElement("span");
        body.className = "search-drop-body";

        const title = document.createElement("span");
        title.className = "search-drop-title";
        title.textContent = doc.title;

        const snippet = document.createElement("span");
        snippet.className = "search-drop-snippet";
        snippet.textContent = doc.description || doc.subtitle || truncateToEndOfSentence(doc.content, 18);

        body.appendChild(title);
        body.appendChild(snippet);
        a.appendChild(icon);
        a.appendChild(body);
        panel.appendChild(a);
        items.push(a);
      });
      showPanel();
    }

    function doSearch(term) {
      let results = [];
      try {
        results = index.search(term);
      } catch (e) {
        results = [];
      }
      render(term, results);
    }

    function startSearch(term) {
      if (index) {
        doSearch(term);
      } else if (queuedTerm) {
        queuedTerm = term;
      } else {
        queuedTerm = term;
        initIndex();
      }
    }

    function initIndex() {
      const request = new XMLHttpRequest();
      request.open("GET", indexUrl);
      request.responseType = "json";
      request.addEventListener("load", function() {
        const documents = request.response;
        if (!documents) {
          return;
        }
        lookup = {};
        index = lunr(function() {
          this.ref("uri");
          this.field("title", { boost: 10 });
          this.field("description", { boost: 5 });
          this.field("subtitle");
          this.field("content");
          this.field("categories");
          this.field("tags");
          for (const document of documents) {
            this.add(document);
            lookup[document.uri] = document;
          }
        });
        if (queuedTerm) {
          const term = queuedTerm;
          queuedTerm = null;
          doSearch(term);
        }
      }, false);
      request.send(null);
    }

    function setActive(i) {
      items.forEach(function(item, idx) {
        item.classList.toggle("active", idx === i);
      });
      activeItem = i;
    }

    function goToResult(i) {
      if (i >= 0 && i < items.length) {
        window.location.href = items[i].getAttribute("href");
      }
    }

    let timer = null;
    input.addEventListener("input", function() {
      clearTimeout(timer);
      const term = input.value.trim();
      if (!term || term.length < 2) {
        hidePanel();
        return;
      }
      timer = setTimeout(function() {
        startSearch(term);
      }, 200);
    }, false);

    form.addEventListener("submit", function(event) {
      event.preventDefault();
      const term = input.value.trim();
      if (!term) {
        return;
      }
      startSearch(term);
      if (items.length === 0 && panel.children.length === 1) {
        showPanel();
      }
    }, false);

    input.addEventListener("keydown", function(event) {
      if (event.key === "Escape") {
        input.value = "";
        hidePanel();
        return;
      }
      if (event.key === "Enter") {
        event.preventDefault();
        if (activeItem >= 0) {
          goToResult(activeItem);
        } else {
          goToResult(0);
        }
        return;
      }
      if (event.key === "ArrowDown") {
        event.preventDefault();
        if (items.length) {
          setActive(activeItem + 1 < items.length ? activeItem + 1 : 0);
        }
        return;
      }
      if (event.key === "ArrowUp") {
        event.preventDefault();
        if (items.length) {
          setActive(activeItem - 1 >= 0 ? activeItem - 1 : items.length - 1);
        }
      }
    }, false);

    document.addEventListener("click", function(event) {
      if (!form.contains(event.target) && !panel.contains(event.target)) {
        hidePanel();
      }
    }, false);

    const urlQ = new URLSearchParams(window.location.search).get("q");
    if (urlQ && urlQ.trim()) {
      input.value = urlQ;
      startSearch(urlQ.trim());
      showPanel();
    }

    function truncateToEndOfSentence(text, minWords) {
      let result = "";
      let wordCount = 0;
      const regexp = /(\S+)(\s*)/g;
      let match;
      while ((match = regexp.exec(text))) {
        wordCount++;
        if (wordCount <= minWords) {
          result += match[0];
        } else {
          const char1 = match[1][match[1].length - 1];
          const char2 = match[2][0];
          if (/[.?!"]/.test(char1) || char2 === "\n") {
            result += match[1];
            break;
          } else {
            result += match[0];
          }
        }
      }
      return result;
    }
  }, false);
})(document.currentScript.getAttribute("data-index"));

document.addEventListener("DOMContentLoaded", () => {
  // === 1. DARK MODE TOGGLE ===
  const toggleDark = document.getElementById("toggle-dark");
  if (toggleDark) {
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      document.body.classList.add("dark");
      toggleDark.checked = true;
    }

    toggleDark.addEventListener("change", () => {
      document.body.classList.toggle("dark");
      const newTheme = document.body.classList.contains("dark") ? "dark" : "light";
      localStorage.setItem("theme", newTheme);
    });
  }

  // === 2. LANGUAGE SWITCHER ===
  const langSelect = document.getElementById("lang-switch");
  if (langSelect) {
    langSelect.addEventListener("change", function () {
      const val = this.value;
      const currentPath = window.location.pathname;

      if (val === "en") {
        window.location.href = currentPath.startsWith("/en") ? currentPath : "/en/";
      } else {
        window.location.href = currentPath.startsWith("/en") ? "/" : currentPath;
      }
    });
  }

  // === 3. MOBILE NAV TOGGLE ===
  const navToggle = document.getElementById("nav-toggle");
  const navMenu = document.getElementById("nav-menu");

  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
    });
  }

  // === 4. SCROLL TO TOP ===
  const toTop = document.getElementById("to-top");
  if (toTop) {
    toTop.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // === 5. SEARCH INPUT ===
  const toggleSearch = document.getElementById("toggle-search");
  const overlay = document.getElementById("search-overlay");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");

  let posts = [];

  if (input && results) {
    fetch("/search.json")
      .then((res) => res.json())
      .then((data) => (posts = data));

    toggleSearch?.addEventListener("click", () => {
      overlay?.classList.toggle("active");
      input.value = "";
      results.innerHTML = "";
      input.focus();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") overlay?.classList.remove("active");
    });

    input.addEventListener("input", () => {
      const keyword = input.value.toLowerCase();
      results.innerHTML = "";

      if (keyword.length < 2) return;

      const filtered = posts.filter((post) =>
        post.title.toLowerCase().includes(keyword)
      );

      if (filtered.length === 0) {
        results.innerHTML = "<li>Tidak ditemukan.</li>";
        return;
      }

      filtered.forEach((post) => {
        const li = document.createElement("li");
        li.innerHTML = `
          <a href="${post.url}">
            <strong>${post.title}</strong><br>
            <small>${post.date}</small><br>
            <span>${post.excerpt}</span>
          </a>
        `;
        results.appendChild(li);
      });
    });
  }

  // === 6. ARCHIVE FILTER BY DATE ===
  const cards = document.querySelectorAll(".archive-card");
  const fromInput = document.getElementById("date-from");
  const toInput = document.getElementById("date-to");

  function filterCards() {
    const fromDate = fromInput.value ? new Date(fromInput.value) : null;
    const toDate = toInput.value ? new Date(toInput.value) : null;

    cards.forEach((card) => {
      const cardDate = new Date(card.dataset.date);
      let show = true;

      if (fromDate && cardDate < fromDate) show = false;
      if (toDate && cardDate > toDate) show = false;

      card.style.display = show ? "block" : "none";
    });
  }

  if (fromInput && toInput) {
    fromInput.addEventListener("change", filterCards);
    toInput.addEventListener("change", filterCards);
  }
});

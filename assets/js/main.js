// === 1. DARK MODE TOGGLE ===
const toggleDark = document.getElementById("toggle-dark");

if (toggleDark) {
  // Check localStorage on load
  if (localStorage.getItem("theme") === "dark" || 
     (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches)) {
    document.body.classList.add("dark");
    toggleDark.checked = true;
  }

  toggleDark.addEventListener("change", () => {
    document.body.classList.toggle("dark");
    localStorage.setItem("theme", document.body.classList.contains("dark") ? "dark" : "light");
  });
}

// === 2. LANGUAGE SWITCHER ===
const langSelect = document.getElementById("lang-switch");
if (langSelect) {
  langSelect.addEventListener("change", function () {
    const val = this.value;
    if (val === "en") {
      window.location.href = "https://en.bloghore.vercel.app"; // ganti sesuai domain
    } else if (val === "id") {
      window.location.href = "https://bloghore.vercel.app";
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

// === 4. SCROLL TO TOP (Optional) ===
const toTop = document.getElementById("to-top");
if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

// === 5. LANGUANGE SELECT === 
langSelect.addEventListener("change", function () {
  const val = this.value;
  const currentPath = window.location.pathname;

  if (val === "en") {
    if (!currentPath.startsWith("/en")) {
      window.location.href = "/en/";
    }
  } else {
    if (currentPath.startsWith("/en")) {
      window.location.href = "/";
    }
  }
});

// === SEARCH INPUT ARTICKLE ===
document.addEventListener("DOMContentLoaded", () => {
  const toggleSearch = document.getElementById("toggle-search");
  const overlay = document.getElementById("search-overlay");
  const input = document.getElementById("search-input");
  const results = document.getElementById("search-results");

  let posts = [];

  fetch("/search.json")
    .then((res) => res.json())
    .then((data) => (posts = data));

  // Toggle overlay
  toggleSearch?.addEventListener("click", () => {
    overlay.classList.toggle("active");
    input.value = "";
    results.innerHTML = "";
    input.focus();
  });

  // Close overlay with ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") overlay.classList.remove("active");
  });

  input?.addEventListener("input", () => {
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
});

// === 6. DOCUMENT ARCHIVE SELECT ===
document.addEventListener("DOMContentLoaded", () => {
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

// === 1. DARK MODE TOGGLE ===
const toggleDark = document.getElementById("toggle-dark");

if (toggleDark) {
  // Check saved preference
  if (localStorage.getItem("theme") === "dark") {
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

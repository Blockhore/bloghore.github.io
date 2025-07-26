// === 2. LANGUAGE SWITCHER ===
const langSelect = document.getElementById("lang-switch");
if (langSelect) {
  langSelect.addEventListener("change", function () {
    const val = this.value;
    if (val === "en") {
      window.location.href = "https://en.bloghore.netlify.app"; // ganti sesuai domain
    } else if (val === "id") {
      window.location.href = "https://bloghore.netlify.app";
    }
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

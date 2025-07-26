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

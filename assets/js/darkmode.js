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

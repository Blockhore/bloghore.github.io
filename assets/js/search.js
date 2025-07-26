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

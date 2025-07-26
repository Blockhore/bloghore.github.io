// === 4. SCROLL TO TOP (Optional) ===
const toTop = document.getElementById("to-top");
if (toTop) {
  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

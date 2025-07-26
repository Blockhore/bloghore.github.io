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

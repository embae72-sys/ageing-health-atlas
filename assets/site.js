(() => {
  const switches = Array.from(document.querySelectorAll("button[data-year]"));
  const language = document.querySelector("[data-lang-switch]");
  let year = new URLSearchParams(location.search).get("year") === "2018" ? "2018" : "2024";
  function updateLanguageLink() {
    if (!language) return;
    const link = new URL(language.getAttribute("href"), location.href);
    link.hash = location.hash;
    if (year === "2018") link.searchParams.set("year", year);
    else link.searchParams.delete("year");
    language.href = link.href;
  }
  function display(selected, persist) {
    year = selected;
    switches.forEach(button => button.setAttribute("aria-pressed", String(button.dataset.year === year)));
    document.querySelectorAll("[data-v2018]").forEach(node => {
      node.textContent = node.getAttribute("data-v" + year);
    });
    document.querySelectorAll("[data-w2018]").forEach(bar => {
      const width = Number(bar.getAttribute("data-w" + year));
      bar.parentElement.classList.toggle("unavailable", width < 0);
      bar.style.width = Math.max(0, width) + "%";
    });
    if (persist) {
      const current = new URL(location.href);
      if (year === "2018") current.searchParams.set("year", year);
      else current.searchParams.delete("year");
      try { history.replaceState(null, "", current.href); } catch { /* file previews still switch in place */ }
    }
    document.querySelectorAll("[data-topic-link]").forEach(card => {
      const link = new URL(card.getAttribute("href"),location.href);
      if (year === "2018") link.searchParams.set("year",year);
      else link.searchParams.delete("year");
      card.href=link.href;
    });
    updateLanguageLink();
  }
  switches.forEach(button => button.addEventListener("click",() => display(button.dataset.year,true)));
  window.addEventListener("hashchange",updateLanguageLink);
  document.querySelectorAll("[data-print]").forEach(button => button.addEventListener("click",() => window.print()));
  display(year,false);
})();

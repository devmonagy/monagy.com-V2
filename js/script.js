// Navigation active link highlighting
const links = document.querySelectorAll("nav a");
const sections = document.querySelectorAll("section");
const wrapper = document.getElementById("navbarWrapper");

links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

window.addEventListener("scroll", () => {
  let pos = window.scrollY + 120;
  sections.forEach((sec) => {
    if (pos >= sec.offsetTop && pos < sec.offsetTop + sec.offsetHeight) {
      links.forEach((a) => a.classList.remove("active"));
      document
        .querySelector(`nav a[href="#${sec.id}"]`)
        ?.classList.add("active");
    }
  });

  wrapper.classList.toggle("scrolled", window.scrollY > 20);

  // Scroll-to-top button visibility
  const scrollBtn = document.getElementById("scrollToTop");
  if (scrollBtn) {
    if (window.scrollY > 300) {
      scrollBtn.classList.add("opacity-100", "pointer-events-auto");
    } else {
      scrollBtn.classList.remove("opacity-100", "pointer-events-auto");
    }
  }
});

// Theme toggle
const themeToggle = document.getElementById("themeToggle");
if (localStorage.getItem("theme") === "light") {
  document.body.classList.add("light");
}

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light");
  localStorage.setItem(
    "theme",
    document.body.classList.contains("light") ? "light" : "dark"
  );
});

// Scroll to top button click
const scrollBtn = document.getElementById("scrollToTop");
if (scrollBtn) {
  scrollBtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

//Card click change

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".experience-card").forEach((card) => {
    const range = card.dataset.range;
    const title = card.dataset.title;
    const summary = card.dataset.summary;
    const skills = (card.dataset.skills || "").split(",");
    const details = (card.dataset.details || "")
      .split(";")
      .filter((d) => d.trim());

    let expanded = false;

    function renderDefault() {
      card.innerHTML = `
        <p class="text-sm text-zinc-400 mb-1">${range}</p>
        <p class="text-lg font-semibold mb-1">${title}</p>
        <p class="mb-2">${summary}</p>
        <div class="flex flex-wrap gap-2 text-sm">
          ${skills
            .map(
              (s) =>
                `<span class="bg-[var(--badge-bg)] px-3 py-1 rounded-md">${s.trim()}</span>`
            )
            .join("")}
        </div>
      `;
    }

    function renderExpanded() {
      card.innerHTML = `
        <div class="fade-in">
          <p class="text-sm text-zinc-400 mb-1">${range}</p>
          <p class="text-lg font-semibold mb-3">${title}</p>
          <ul class="list-disc pl-5 space-y-2 text-sm mb-4">
            ${details.map((d) => `<li>${d.trim()}</li>`).join("")}
          </ul>
          <div class="flex flex-wrap gap-2 text-sm">
            ${skills
              .map(
                (s) =>
                  `<span class="bg-[var(--badge-bg)] px-3 py-1 rounded-md">${s.trim()}</span>`
              )
              .join("")}
          </div>
        </div>
      `;
    }

    // init
    renderDefault();

    card.addEventListener("click", () => {
      expanded ? renderDefault() : renderExpanded();
      expanded = !expanded;
    });
  });
});

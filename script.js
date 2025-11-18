const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const navAnchors = document.querySelectorAll(".nav-links a");
const themeToggle = document.querySelector(".theme-toggle");
const body = document.body;
const introLoader = document.getElementById("intro-loader");
const introTextEl = document.getElementById("intro-text");

if (introLoader && introTextEl) {
  const introMessage = "Sagi Nevet";
  let introIndex = 0;

  const typeNext = () => {
    if (introIndex < introMessage.length) {
      introTextEl.textContent += introMessage[introIndex];
      introIndex += 1;
      setTimeout(typeNext, 140);
    } else {
      introLoader.classList.add("hide");
      setTimeout(() => introLoader.remove(), 500);
    }
  };

  setTimeout(typeNext, 400);
}

navToggle?.addEventListener("click", () => {
  navLinks?.classList.toggle("show");
});

navAnchors.forEach((anchor) =>
  anchor.addEventListener("click", () => {
    navLinks?.classList.remove("show");
  })
);

const prefersLight = window.matchMedia("(prefers-color-scheme: light)");

const applyTheme = (isLight) => {
  body.classList.toggle("light", isLight);
};

applyTheme(prefersLight.matches);
prefersLight.addEventListener("change", (event) => applyTheme(event.matches));

themeToggle?.addEventListener("click", () => {
  body.classList.toggle("light");
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
const revealEls = document.querySelectorAll(".reveal");

if (!reduceMotion.matches && "IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15 }
  );

  revealEls.forEach((el) => observer.observe(el));
} else {
  revealEls.forEach((el) => el.classList.add("visible"));
}

document.addEventListener("scroll", () => {
  const header = document.querySelector(".site-header");
  if (!header) return;
  const scrolled = window.scrollY;
  header.style.backgroundPositionY = `${scrolled * 0.1}px`;
});


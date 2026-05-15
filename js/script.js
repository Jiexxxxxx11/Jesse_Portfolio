const header = document.querySelector("#site-header");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("#nav-links");
const scrollLinks = document.querySelectorAll('a[href^="#"]');
const sections = document.querySelectorAll("main section[id]");

const closeMobileNav = () => {
  navLinks.classList.remove("is-open");
  navToggle.setAttribute("aria-expanded", "false");
};

const updateHeader = () => {
  header.classList.toggle("is-scrolled", window.scrollY > 24);
};

navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("is-open");
  navToggle.setAttribute("aria-expanded", String(isOpen));
});

scrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const targetId = link.getAttribute("href");

    if (!targetId || targetId === "#") return;

    const target = document.querySelector(targetId);
    if (!target) return;

    event.preventDefault();
    closeMobileNav();
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const activeLink = document.querySelector(`.nav-links a[href="#${entry.target.id}"]`);
      document.querySelectorAll(".nav-links a").forEach((link) => {
        link.classList.toggle("is-active", link === activeLink);
      });
    });
  },
  {
    rootMargin: "-45% 0px -50% 0px",
    threshold: 0,
  }
);

sections.forEach((section) => observer.observe(section));
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("resize", () => {
  if (window.innerWidth > 780) closeMobileNav();
});
updateHeader();

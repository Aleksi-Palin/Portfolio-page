const contactForm = document.querySelector("#contact-form");
const toast = document.querySelector(".toast");
const navLinks = [...document.querySelectorAll(".nav-link")];
const sections = [...document.querySelectorAll("section[id]")];

contactForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(contactForm);
  const subject = `Portfolio contact from ${formData.get("name")}`;
  const body = `Name: ${formData.get("name")}\nEmail: ${formData.get("email")}\n\n${formData.get("message")}`;
  window.location.href = `mailto:hello@aleks.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  toast.textContent = "Opening your email client";
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 2200);
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    navLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
    });
  },
  { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.2, 0.6] }
);

sections.forEach((section) => observer.observe(section));
// document: page_animate.js

document.addEventListener("DOMContentLoaded", () => {
  setupNavbarObserver();
});

function setupNavbarObserver() {
  const nav = document.querySelector(".navbar");
  const cover = document.getElementById("section-cover");

  const io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) nav.classList.remove("visible");
      else nav.classList.add("visible");
    },
    { rootMargin: "-10px 0px 0px 0px", threshold: 0 }
  );

  if (cover) io.observe(cover);
}

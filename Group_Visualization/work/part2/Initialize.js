// ================================
// Initialize Mapbox Map
// ================================
mapboxgl.accessToken =
  "pk.eyJ1IjoieWc4MDY4IiwiYSI6ImNtNjd4dWpteTA0NDkyanM4Y2czZjVybGMifQ.OMwjTRog4M7HBlXYqe7f6w";

var map_2 = new mapboxgl.Map({
  container: "map_2",
  style: "mapbox://styles/yg8068/cmah9cbh600xt01sl6rup38yb",
  center: [40, 20],
  zoom: 1.5,
  maxPitch: 60,
  renderWorldCopies: false,
});

map_2.on("load", function () {
  addDataSources();
  addLayers();
  drawChannelChart();
  setupLineButtons();
  updateLineDisplay();
});

/* ----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("section-map");
  const map = map_2;
  const vh = window.innerHeight;

  let triggered = false;

  window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();

    if (!triggered && rect.top < vh / 2 + 100 && rect.bottom > vh / 2 - 100) {
      triggered = true;

      map.easeTo({
        zoom: 2.6,
        center: [65, 40],
        duration: 1500,
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      });
    }
  });
});

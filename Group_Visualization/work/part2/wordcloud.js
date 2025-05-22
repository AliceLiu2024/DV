// wordcloud.js
let pulseToggle = false;
let pulseInterval;

(function () {
  function initWordList() {
    if (!window.wordMapping) {
      return setTimeout(initWordList, 200);
    }

    console.log("🔑 wordMapping keys:", Object.keys(window.wordMapping));

    const container = document.getElementById("wordcloud");
    container.innerHTML = "";
    container.style.display = "flex";
    container.style.flexDirection = "column";
    container.style.alignItems = "flex-start";
    container.style.padding = "10px";
    container.style.gap = "8px";

    const words = Object.entries(window.wordMapping).map(([text, cfg]) => ({
      text,
      cfg,
    }));

    words.forEach((word) => {
      const el = document.createElement("div");
      el.className = "wordcloud-word";
      el.textContent = word.text;
      el.style.fontSize = `${word.size}px`;
      el.style.cursor = "pointer";

      el.addEventListener("click", () => {
        highlightCityPoints(word.cfg.cities);
        showInfoPanel(word.cfg);
        flyToCities(word.cfg.cities);
      });

      container.appendChild(el);
    });
  }

  initWordList();

  //Highlight city points
  function highlightCityPoints(cityIds) {
    if (!window.map_2) return;
    map_2.setFilter("highlight_cities", [
      "in",
      ["get", "id"],
      ["literal", cityIds],
    ]);
    // Start the pulse animation
    if (pulseInterval) clearInterval(pulseInterval);
    pulseInterval = setInterval(() => {
      pulseToggle = !pulseToggle;
      const radius = pulseToggle ? 8 : 14;
      map_2.setPaintProperty("highlight_cities", "circle-radius", radius);
    }, 600);
  }

  // Focus on the city
  function flyToCities(cityIds) {
    const features = (window.cityIndex?.features || []).filter((f) =>
      cityIds.includes(f.properties.id)
    );
    if (!features.length) return;
    const cityCollection = turf.featureCollection(features);
    const bbox = turf.bbox(cityCollection);
    const currentPitch = map_2.getPitch();
    const currentBearing = map_2.getBearing();

    map_2.fitBounds(bbox, {
      padding: 50,
      duration: 1000,
      maxZoom: 5,
      pitch: currentPitch,
      bearing: currentBearing,
    });
  }

  // Display the information panel
  function showInfoPanel({ title, description }) {
    const panel = document.getElementById("infoPanel");
    document.getElementById("infoTitle").textContent = title;
    document.getElementById("infoText").textContent = description;
    panel.style.display = "block";
    panel.classList.add("show");
  }

  // Global click, click on a blank space to close the panel
  document.addEventListener("click", (e) => {
    if (!e.target.classList.contains("wordcloud-word")) {
      const panel = document.getElementById("infoPanel");
      panel.classList.remove("show");
      panel.classList.add("hide");
      // Completely hide after the animation ends
      setTimeout(() => {
        panel.style.display = "none";
        panel.classList.remove("hide");
      }, 400);

      // Clear highlights and animations
      if (window.map_2) {
        map_2.setFilter("highlight_cities", [
          "in",
          ["get", "id"],
          ["literal", []],
        ]);
      }
      if (pulseInterval) {
        clearInterval(pulseInterval);
        pulseInterval = null;
      }
    }
  });
})();

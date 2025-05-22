// ================================
// Add Data Sources
// ================================

function addDataSources() {
  // Route(line)
  map_2.addSource("west_continuous", {
    type: "geojson",
    data: "part2/data/west_continuous.geojson",
  });
  map_2.addSource("middle_continuous", {
    type: "geojson",
    data: "part2/data/middle_continuous.geojson",
  });
  map_2.addSource("east_continuous", {
    type: "geojson",
    data: "part2/data/east_continuous.geojson",
  });
  // City(point)
  map_2.addSource("west_city", {
    type: "geojson",
    data: "part2/data/west_city_points.geojson",
  });
  map_2.addSource("middle_city", {
    type: "geojson",
    data: "part2/data/middle_city_points.geojson",
  });
  map_2.addSource("east_city", {
    type: "geojson",
    data: "part2/data/east_city_points.geojson",
  });

  // 1. city_index.geojson
  fetch("part2/data/city_index.geojson")
    .then((res) => res.json())
    .then((geojson) => {
      window.cityIndex = geojson;

      // 2. city_index source
      map_2.addSource("city_index", {
        type: "geojson",
        data: geojson,
      });

      map_2.addLayer({
        id: "city_labels",
        type: "symbol",
        source: "city_index",
        minzoom: 3.5,
        layout: {
          "text-field": ["upcase", ["get", "city"]],

          "text-font": ["Roboto Mono Light"],
          "text-size": 10,

          "text-allow-overlap": false,

          "text-pitch-alignment": "viewport",
          "text-rotation-alignment": "viewport",
          "text-keep-upright": true,
          "text-allow-overlap": true,
          "text-ignore-placement": true,
          "text-offset": [0, 1.2],
        },
        paint: {
          "text-color": "#222",
        },
      });

      // 4.Highlight city point layer
      map_2.addLayer({
        id: "highlight_cities",
        type: "circle",
        source: "city_index",
        filter: ["in", ["get", "id"], ["literal", []]],
        paint: {
          "circle-radius": 10,
          "circle-color": "#ffff00",
          "circle-opacity": 0.8,
          "circle-stroke-color": "#000",
          "circle-stroke-width": 2,
        },
      });
    })
    .catch(console.error);

  // 5. Word→City Mapping
  fetch("part2/data/word_mapping.json")
    .then((res) => res.json())
    .then((json) => (window.wordMapping = json))
    .catch(console.error);
}

// ================================
// Add Layers
// ================================

function addLayers() {
  // Render city point-west
  map_2.addLayer({
    id: "west_city_points",
    type: "circle",
    source: "west_city",
    paint: {
      "circle-radius": 5,
      "circle-color": "#2391c5",
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 1,
    },
  });
  // Render city point-east
  map_2.addLayer({
    id: "east_city_points",
    type: "circle",
    source: "east_city",
    paint: {
      "circle-radius": 5,
      "circle-color": "#EC9A28",
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 1,
    },
  });
  // Render city point-middle
  map_2.addLayer({
    id: "middle_city_points",
    type: "circle",
    source: "middle_city",
    paint: {
      "circle-radius": 5,
      "circle-color": "#247122",
      "circle-stroke-color": "#fff",
      "circle-stroke-width": 1,
    },
  });

  //Render line -west
  map_2.addLayer({
    id: "west_line",
    type: "line",
    source: "west_continuous",
    paint: {
      "line-width": 3,
      "line-color": "#2391c5",
      "line-opacity": 0.8,
    },
  });
  // Render line -east
  map_2.addLayer({
    id: "east_line",
    type: "line",
    source: "east_continuous",
    paint: {
      "line-width": 3,
      "line-color": "#EC9A28",
      "line-opacity": 0.8,
    },
  });
  // Render line -middle
  map_2.addLayer({
    id: "middle_line",
    type: "line",
    source: "middle_continuous",
    paint: {
      "line-width": 3,
      "line-color": "#247122",
      "line-opacity": 0.8,
    },
  });
}

mapboxgl.accessToken =
  "pk.eyJ1Ijoic3drMjAwMCIsImEiOiJjbTdraXR4N3owMTZ4MmlzZG03dDIyaGJkIn0.IrX_wW0bMYbw0jOr5nIGGA";
const map_1 = new mapboxgl.Map({
  container: "map_1",
  style: "mapbox://styles/mapbox/dark-v11",
  center: [40, 40],
  zoom: 1.5,
  maxZoom: 2.15,
});

// Load country border data
map_1.on("load", () => {
  const features = [];
  for (let key in jsonData[0]) {
    let gj = jsonData[0][key];
    let ZbCkData;
    let ZbJkData;
    let ZbZeData;
    if (jsonData[0][key].对中国出口.value.length == 9) {
      ZbCkData = [
        jsonData[0][key].对中国出口.value[0].value,
        jsonData[0][key].对中国出口.value[1].value,
        jsonData[0][key].对中国出口.value[2].value,
        jsonData[0][key].对中国出口.value[3].value,
        jsonData[0][key].对中国出口.value[4].value,
        jsonData[0][key].对中国出口.value[5].value,
        jsonData[0][key].对中国出口.value[6].value,
        jsonData[0][key].对中国出口.value[7].value,
        jsonData[0][key].对中国出口.value[8].value,
      ];
    } else {
      ZbCkData = [
        jsonData[0][key].对中国出口.value[0].value,
        jsonData[0][key].对中国出口.value[1].value,
        jsonData[0][key].对中国出口.value[2].value,
        jsonData[0][key].对中国出口.value[3].value,
        jsonData[0][key].对中国出口.value[4].value,
        jsonData[0][key].对中国出口.value[5].value,
        jsonData[0][key].对中国出口.value[6].value,
        jsonData[0][key].对中国出口.value[7].value,
      ];
    }
    if (jsonData[0][key].从中国进口.value.length == 9) {
      ZbJkData = [
        jsonData[0][key].从中国进口.value[0].value,
        jsonData[0][key].从中国进口.value[1].value,
        jsonData[0][key].从中国进口.value[2].value,
        jsonData[0][key].从中国进口.value[3].value,
        jsonData[0][key].从中国进口.value[4].value,
        jsonData[0][key].从中国进口.value[5].value,
        jsonData[0][key].从中国进口.value[6].value,
        jsonData[0][key].从中国进口.value[7].value,
        jsonData[0][key].从中国进口.value[8].value,
      ];
    } else {
      ZbJkData = [
        jsonData[0][key].从中国进口.value[0].value,
        jsonData[0][key].从中国进口.value[1].value,
        jsonData[0][key].从中国进口.value[2].value,
        jsonData[0][key].从中国进口.value[3].value,
        jsonData[0][key].从中国进口.value[4].value,
        jsonData[0][key].从中国进口.value[5].value,
        jsonData[0][key].从中国进口.value[6].value,
        jsonData[0][key].从中国进口.value[7].value,
      ];
    }
    if (jsonData[0][key].与中国进出口总额.value.length == 9) {
      ZbZeData = [
        jsonData[0][key].与中国进出口总额.value[0].value,
        jsonData[0][key].与中国进出口总额.value[1].value,
        jsonData[0][key].与中国进出口总额.value[2].value,
        jsonData[0][key].与中国进出口总额.value[3].value,
        jsonData[0][key].与中国进出口总额.value[4].value,
        jsonData[0][key].与中国进出口总额.value[5].value,
        jsonData[0][key].与中国进出口总额.value[6].value,
        jsonData[0][key].与中国进出口总额.value[7].value,
        jsonData[0][key].与中国进出口总额.value[8].value,
      ];
    } else {
      ZbZeData = [
        jsonData[0][key].与中国进出口总额.value[0].value,
        jsonData[0][key].与中国进出口总额.value[1].value,
        jsonData[0][key].与中国进出口总额.value[2].value,
        jsonData[0][key].与中国进出口总额.value[3].value,
        jsonData[0][key].与中国进出口总额.value[4].value,
        jsonData[0][key].与中国进出口总额.value[5].value,
        jsonData[0][key].与中国进出口总额.value[6].value,
        jsonData[0][key].与中国进出口总额.value[7].value,
      ];
    }
    let coordinates = [];
    if (jsonZbData[0][key]) {
      coordinates = jsonZbData[0][key];
    }
    features.push({
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: coordinates, //[-74.5, 40]
      },
      properties: {
        title: jsonGjzyData2[0][key],
        description: jsonGjzyData2[0][key],
        ZbCkData: ZbCkData,
        ZbJkData: ZbJkData,
        ZbZeData: ZbZeData,
      },
    });
  }

  map_1.addSource("single-point", {
    type: "geojson",
    //data: 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
    data: {
      type: "FeatureCollection",
      features: features,
    },
  });

  // Replace the existing point layer definition
  // Add a glow effect bottom layer
  map_1.addLayer({
    id: "point-glow-outer",
    type: "circle",
    source: "single-point",
    paint: {
      "circle-radius": 20,
      "circle-color": "rgba(255, 243, 173, 0.15)",
      "circle-blur": 1,
    },
  });

  // Add the glow effect middle layer
  map_1.addLayer({
    id: "point-glow-middle",
    type: "circle",
    source: "single-point",
    paint: {
      "circle-radius": 12,
      "circle-color": "rgba(255, 243, 173, 0.25)",
      "circle-blur": 0.5,
    },
  });

  // Add the main point layer
  map_1.addLayer({
    id: "point",
    type: "circle",
    source: "single-point",
    paint: {
      "circle-radius": 5,
      "circle-color": "rgba(255, 215, 0, 0.8)",
      "circle-stroke-width": 1.5,
      "circle-stroke-color": "rgba(255, 255, 255, 0.9)",
    },
  });

  // Add pulsating animation effect
  // Add the following class in the style sheet
  const style = document.createElement("style");
  style.textContent = `
    @keyframes pulse {
        0% {
            opacity: 0.4;
            transform: scale(0.8);
        }
        50% {
            opacity: 0.6;
            transform: scale(1.2);
        }
        100% {
            opacity: 0.4;
            transform: scale(0.8);
        }
    }
    
    .pulse-circle {
        width: 12px;
        height: 12px;
        background-color: rgba(255, 215, 0, 0.6);
        border-radius: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
        animation: pulse 2s infinite ease-in-out;
        pointer-events: none;
    }
`;
  document.head.appendChild(style);

  //Interaction effect when the mouse is hovering
  map_1.on("mouseenter", "point", function (e) {
    map_1.getCanvas().style.cursor = "pointer";

    const coordinates = e.features[0].geometry.coordinates.slice();
    const point = map_1.project(coordinates);

    // Enhance the hover effect
    map_1.setPaintProperty("point", "circle-radius", 7);
    map_1.setPaintProperty("point", "circle-color", "rgba(255, 215, 0, 0.9)");
    map_1.setPaintProperty("point-glow-middle", "circle-radius", 16);
    map_1.setPaintProperty("point-glow-outer", "circle-radius", 25);
  });

  map_1.on("mouseleave", "point", function () {
    map_1.getCanvas().style.cursor = "";

    // Restore the original effect
    map_1.setPaintProperty("point", "circle-radius", 5);
    map_1.setPaintProperty("point", "circle-color", "rgba(255, 215, 0, 0.8)");
    map_1.setPaintProperty("point-glow-middle", "circle-radius", 12);
    map_1.setPaintProperty("point-glow-outer", "circle-radius", 20);
  });

  map_1.on("click", "point", function (e) {
    const coordinates = e.features[0].geometry.coordinates.slice();
    const properties = e.features[0].properties;
    const title = properties.title;
    const ZbCkData = properties.ZbCkData.replace("[", "")
      .replace("]", "")
      .split(",");
    const ZbJkData = properties.ZbJkData.replace("[", "")
      .replace("]", "")
      .split(",");
    const ZbZeData = properties.ZbZeData.replace("[", "")
      .replace("]", "")
      .split(",");
    console.log(ZbCkData);
    console.log(ZbJkData);
    console.log(ZbZeData);

    // Create Popup content
    const popupContent = `<canvas id="popupLineChart" width="450" height="250"></canvas>`;

    // Display Popup
    const popup = new mapboxgl.Popup()
      .setLngLat(coordinates)
      .setHTML(popupContent)
      .addTo(map_1)
      .getElement()
      .classList.add("transparent-popup");

    setTimeout(() => {
      const ctx = document.getElementById("popupLineChart").getContext("2d");

      if (window.myPopupChart) {
        window.myPopupChart.destroy();
      }

      window.myPopupChart = new Chart(ctx, {
        type: "line",
        data: {
          labels: [
            "2016",
            "2017",
            "2018",
            "2019",
            "2020",
            "2021",
            "2022",
            "2023",
            "2024",
          ],
          datasets: [
            {
              label: title + " exports to China",
              data: ZbCkData,
              borderColor: "rgb(11,80,207)",
              backgroundColor: "rgba(0, 0, 0, 0)",
              pointBorderColor: "rgba(11,80,207, 1)",
              pointBackgroundColor: "rgba(11,80,207, 1)",
              pointBorderWidth: 0.5,
            },
            {
              label: title + " imports from China",
              data: ZbJkData,
              borderColor: "rgb(228,171,0)",
              backgroundColor: "rgba(0, 0, 0, 0)",
              pointBorderColor: "rgba(228,171,0, 1)",
              pointBackgroundColor: "rgba(2228,171,0, 1)",
              pointBorderWidth: 0.5,
            },
            {
              label:
                "The total volume of imports and exports between " +
                title +
                " and China",
              data: ZbZeData,
              borderColor: "rgba(75, 192, 192, 1)",
              backgroundColor: "rgba(0, 0, 0, 0)",
              pointBorderColor: "rgba(75, 192, 192, 1)",
              pointBackgroundColor: "rgba(75, 192, 192, 1)",
              pointBorderWidth: 0.5,
            },
          ],
        },
        options: {
          responsive: false,
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }, 100);
  });

  // Change the cursor style when the mouse is hovering
  map_1.on("mouseenter", "point", function () {
    map_1.getCanvas().style.cursor = "pointer";
  });

  map_1.on("mouseleave", "point", function () {
    map_1.getCanvas().style.cursor = "";
  });
});

/* ----------------------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  const section = document.getElementById("section-globe");
  const map = map_1;
  const vh = window.innerHeight;

  let triggered = false;

  window.addEventListener("scroll", () => {
    const rect = section.getBoundingClientRect();

    if (!triggered && rect.top < vh / 2 + 100 && rect.bottom > vh / 2 - 100) {
      triggered = true;

      map.easeTo({
        zoom: 2.2,

        center: [55, 40],

        duration: 1500,
        easing: (t) =>
          t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2,
      });
    }
  });
});

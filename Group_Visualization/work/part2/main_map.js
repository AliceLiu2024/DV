// main_map.js

//Global color matching & highlighting functions
const lineDefault = { west: "#40C4FF", middle: "#247122", east: "#EC9A28" };
const lineHighlightColor = "rgba(255, 215, 0, 1)";

/**
 * Highlight or unhighlight a line
 * @param {string} channel 'west'|'middle'|'east'
 * @param {boolean} hover
 */
function highlightMapLine(channel, hover) {
  const layerId = channel + "_line";
  map_2.setPaintProperty(
    layerId,
    "line-color",
    hover ? lineHighlightColor : lineDefault[channel]
  );
  map_2.setPaintProperty(layerId, "line-width", hover ? 5 : 2);
}

//Store the Chart instance
let channelChart;

// ================================
// Set line button event monitoring
// ================================
function setupLineButtons() {
  const lineButtons = document.querySelectorAll(".line-button");
  lineButtons.forEach((btn) => {
    btn.classList.add("active");
    btn.addEventListener("click", function () {
      const selectedLine = this.dataset.line;
      const isActive = this.classList.toggle("active");
      updateLineDisplay(selectedLine, isActive);
    });
  });
}

// ================================
// Update map display
// ================================
function updateLineDisplay(lineName, visible) {
  const visibility = visible ? "visible" : "none";
  switch (lineName) {
    case "west_continuous":
      map_2.setLayoutProperty("west_line", "visibility", visibility);
      map_2.setLayoutProperty("west_city_points", "visibility", visibility);
      break;
    case "middle_continuous":
      map_2.setLayoutProperty("middle_line", "visibility", visibility);
      map_2.setLayoutProperty("middle_city_points", "visibility", visibility);
      break;
    case "east_continuous":
      map_2.setLayoutProperty("east_line", "visibility", visibility);
      map_2.setLayoutProperty("east_city_points", "visibility", visibility);
      break;
  }
}

// ================================
// Mapping the proportion of freight volume in corridors
// ================================
function drawChannelChart() {
  fetch("part2/data/channel_2024.csv")
    .then((res) => res.text())
    .then((csvText) => {
      const [header, ...rows] = csvText.trim().split("\n");
      const rawLabels = header
        .split(",")
        .slice(1)
        .map((h) => h.trim());
      const labels = rawLabels.map((h) =>
        h.includes("westbound") ? "Westbound" : "Eastbound"
      );

      const channelValues = {};
      rows.forEach((line) => {
        const [chan, ...vals] = line.split(",").map((s) => s.trim());
        channelValues[chan] = vals.map((v) => +v);
      });

      const channels = ["west", "middle", "east"];
      const percs = {};
      channels.forEach((chan) => (percs[chan] = []));
      for (let i = 0; i < labels.length; i++) {
        const sum =
          channels.reduce((s, chan) => s + channelValues[chan][i], 0) || 1;
        channels.forEach((chan) => {
          percs[chan].push(+((channelValues[chan][i] / sum) * 100).toFixed(1));
        });
      }

      const colors = ["#2391c5", "#247122", "#EC9A28"];

      // Constructing datasets
      const datasets = channels.map((chan, idx) => ({
        label: chan.charAt(0).toUpperCase() + chan.slice(1),
        data: percs[chan],
        backgroundColor: colors[idx],
        // Fixed thickness
        barThickness: 16,
        borderWidth: 0,
        hoverBackgroundColor: "rgba(255, 215, 0, 0.8)",
        hoverBorderColor: "#FFD600",
        hoverBorderWidth: 2,
      }));

      const ctx = document.getElementById("trainChart").getContext("2d");
      channelChart = new Chart(ctx, {
        type: "bar",
        data: { labels, datasets },
        options: {
          indexAxis: "y",
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              stacked: true,
              ticks: { callback: (val) => val + "%" },
              font: {
                family: "Georgia",
                size: 10,
              },
              title: { display: false },
            },
            y: {
              stacked: true,
              font: {
                family: "Georgia",
                size: 10,
              },
              title: { display: false },
            },
          },
          plugins: {
            tooltip: {
              callbacks: {
                label(context) {
                  const chan = context.dataset.label.toLowerCase();
                  const idx = context.dataIndex;
                  const rawValue = channelValues[chan][idx];
                  const pct = context.parsed.x;
                  return `${context.dataset.label}：${pct}% （${rawValue} TEU）`;
                },
              },
              titleFont: {
                family: "Georgia",
                size: 10,
              },
              bodyFont: {
                family: "Georgia",
                size: 10,
              },
            },
            legend: {
              position: "bottom",
              labels: {
                boxWidth: 25,
                boxHeight: 8,

                font: {
                  family: "Georgia",
                  size: 12,
                },
              },
            },
            title: {
              display: true,
              text: "2024 CR Express Cargo Volume (TEU)",
              font: {
                family: "Georgia",
                size: 12,
              },
            },
          },
          onHover: (event, elements) => {
            // Cancel all
            channels.forEach((ch) => highlightMapLine(ch, false));
            if (elements.length) {
              const { datasetIndex } = elements[0];
              const channel = channels[datasetIndex];
              highlightMapLine(channel, true);
            }
          },
        },
      });

      // Chart mouseleave
      channelChart.canvas.addEventListener("mouseleave", () => {
        channels.forEach((ch) => highlightMapLine(ch, false));
        channelChart.setActiveElements([]);
        channelChart.update();
      });

      // Map layer hover => Highlight chart
      channels.forEach((channel, idx) => {
        const layerId = channel + "_line";
        map_2.on("mousemove", layerId, () => {
          const activeEls = labels.map((_, i) => ({
            datasetIndex: idx,
            index: i,
          }));
          channelChart.setActiveElements(activeEls);
          channelChart.update();
        });
        map_2.on("mouseleave", layerId, () => {
          channelChart.setActiveElements([]);
          channelChart.update();
        });
      });
    })
    .catch((err) => console.error("Failed to load channel_2024.csv：", err));
}

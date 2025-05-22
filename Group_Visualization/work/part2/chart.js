// Get the canvas element
const chartContainer = document.getElementById("chart-container");
const briChartElement = document.getElementById("briChart");
let chartInitialized = false; // Mark whether the chart has been initialized

// Intersection Observer
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !chartInitialized) {
        // Initialize the chart when the element enters the viewport
        initializeChart();
        chartInitialized = true; // Prevent duplicate initialization
      }
    });
  },
  {
    threshold: 0.5, // Triggered when 50% of the element enters the viewport
  }
);

// Start observation
observer.observe(chartContainer);

// Function to initialize the chart
function initializeChart() {
  const years = [
    2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021, 2022,
    2023, 2024,
  ];
  const cargoVolumes = [
    1404, 3674, 6960, 26070, 68902, 145794, 317930, 541000, 725000, 1135000,
    1464150, 1614108.25, 1901949, 2077216,
  ];
  const numTrains = [
    17, 42, 80, 308, 815, 1702, 3673, 6363, 8225, 12406, 15183, 16562, 17523,
    19392,
  ];

  const ctx = briChartElement.getContext("2d");

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: years,
      datasets: [
        {
          type: "bar",
          label: "Cargo Volume (TEU)",
          data: cargoVolumes,
          backgroundColor: "rgba(28, 99, 176, 0.7)",
          yAxisID: "y-left",
        },
        {
          type: "line",
          label: "Number of Trains",
          data: numTrains,
          borderColor: "rgba(255, 206, 86, 1)",
          backgroundColor: "rgba(255, 206, 86, 0.2)",
          yAxisID: "y-right",
          tension: 0.3,
          pointRadius: 4,
          pointHoverRadius: 6,
        },
      ],
    },
    options: {
      responsive: true,
      interaction: {
        mode: "index",
        intersect: false,
      },
      scales: {
        "y-left": {
          type: "linear",
          position: "left",
          title: {
            display: true,
            text: "Cargo Volume (TEU)",
            color: "rgb(13, 52, 94)",
          },
          ticks: {
            color: "rgb(13, 52, 94)",
          },
        },
        "y-right": {
          type: "linear",
          position: "right",
          title: {
            display: true,
            text: "Number of Trains",
            color: "rgb(13, 52, 94)",
          },
          ticks: {
            color: "rgb(13, 52, 94)",
          },
          grid: {
            drawOnChartArea: false,
          },
        },
      },
      plugins: {
        title: {
          display: true,
          text: "Annual changes in the number of TEUs and trains",
          color: "rgb(13, 52, 94)",
          font: {
            family: "'Georgia', serif",
            size: 20,
            weight: "bold",
            style: "normal",
          },
        },
        tooltip: {
          mode: "index",
          intersect: false,
          titleColor: "rgb(255, 255, 255)",
          bodyColor: "rgb(255, 255, 255)",
          footerColor: "rgb(255, 255, 255)",
        },
      },
      elements: {
        line: {
          borderColor: "rgb(13, 52, 94)",
        },
        bar: {
          borderColor: "rgb(13, 52, 94)",
        },
      },
      layout: {
        padding: 10,
      },
      legend: {
        labels: {
          color: "rgb(13, 52, 94)",
        },
      },
    },
  });
}

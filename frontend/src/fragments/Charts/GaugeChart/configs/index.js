import colors from "assets/theme/base/colors";

const { gradients, dark } = colors;

function configs(labels, datasets, cutout = 60) {
  const backgroundColors = [];

  if (datasets.backgroundColors) {
    datasets.backgroundColors.forEach((color) => {
      if (gradients[color]) {
        if (color === "info") {
          backgroundColors.push(gradients.info.main);
        } else {
          backgroundColors.push(gradients[color].state);
        }
      } else {
        backgroundColors.push(dark.main);
      }
    });
  } else {
    backgroundColors.push(dark.main);
  }

  return {
    data: {
      labels,
      datasets: [
        {
          label: datasets.label,
          weight: 9,
          //cutout,
          tension: 0.9,
          pointRadius: 2,
          borderWidth: 2,
          backgroundColor: backgroundColors,
          fill: false,
          data: datasets.data,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      animation: {
        duration: 0 // disable Y axis animation
      },
      animations: {
        x: false
      },
      interaction: {
        intersect: false,
        mode: "index",
      },
      zoom: {
        enabled: false,
        mode: ''
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false
        },
      },

      // custom
      cutout: '70%',
      circumference: 180,
      rotation: 270,
      aspectRatio: 2,

    },
  };
}

export default configs;

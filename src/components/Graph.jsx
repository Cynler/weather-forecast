import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";


// Register the chart.js plugins
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

// Chart.js options
export const options = {
  scales: {
    y: {
      // suggestedMin: 0,
      display: true,
      // suggestedMax: 40,
      color: "#000",
    },
    x: {
      // display: false,
      border: {
        display: false,
        width: 10,
      },
      grid: {
        display: true,
        color: "rgba(255, 255, 255, 0.1)",
      },
      ticks: {
        color: "#000",
        // display: false,
        font: {
          family: '"Fira Sans", sans-serif',
          weight: 600,
          size: 15,
        },
      },
    },
  },
  responsive: true,
  plugins: {
    tooltip: {
      enabled: true,
      backgroundColor: "rgba(0, 0, 0, 0.8)",
      titleFont: {
        family: '"Fira Sans", sans-serif',
        size: 15,
      },
      bodyFont: {
        family: '"Fira Sans", sans-serif',
        size: 15,
      },
      padding: 20,
      caretSize: 10,
      displayColors: false,
    },
    legend: {
      display: false,
      position: "bottom",
      title: {
        display: false,
        text: "Yes",
        color: "#000",
      },
      strokeStyle: "#000",
      labels: {
        color: "#000",
        padding: 20,
        font: {
          family: '"Fira Sans", sans-serif',
          weight: 600,
          size: 25,
        },
        pointStyle: "line",
        usePointStyle: true,
        pointStyleWidth: 0.001,
      },
    },
    title: {
      display: true,
      text: "Next hours forecast",
    },
  },
};

// Chart.js labels
const TempChart = ({hours, temps}) => {
  const labels = hours;

  const newData = {
    labels,
    datasets: [
      {
        fill: true,
        tension: 0.35,
        label: "",
        data: temps,
        borderColor: "rgba(73, 133, 224, 1)",
        backgroundColor: "rgba(73, 133, 224, 0.5)",
        borderWidth: 5,
        // stepped: true,
        radius: 3,
        hoverRadius: 10,
        hitRadius: 100,
        color: "#fff",
      },
    ],
  };

  return (
    <div className="temp-chart">
      <Line options={options} data={newData} />
    </div>
  );
};

export default TempChart;

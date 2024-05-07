import React from 'react';
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  Tooltip,
  Colors,
  Legend,
} from 'chart.js';
import { Bar, Line } from 'react-chartjs-2';
ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  Tooltip,
  Legend,
  Colors,
);

const NetworkChart = () => {
  return <div>Newtrok Chart</div>;
};

export default NetworkChart;

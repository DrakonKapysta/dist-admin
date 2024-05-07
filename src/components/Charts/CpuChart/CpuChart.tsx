import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  Tooltip,
  Colors,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import ChartService from '../../../API/ChartService';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarController,
  Tooltip,
  Legend,
  Colors,
);

const CpuChart = ({ socketId }: { socketId: string }) => {
  const timerRef = useRef<number | undefined | NodeJS.Timeout>(undefined);
  const [usage, setUsage] = useState([]);
  useEffect(() => {
    timerRef.current = setInterval(async () => {
      const usage = await ChartService.getCpuUsage(socketId);
      console.log(usage);

      setUsage((prev): any => {
        if (prev.length == 10) {
          return [...prev.slice(1), usage.currentLoad];
        }
        return [...prev, usage.currentLoad];
      });
    }, 2000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  return (
    <Line
      data={{
        labels: ['t', 1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        datasets: [
          {
            label: 'CPU Usage',
            data: [null, ...usage],
            borderColor: '#aaaaaa',
            fill: false,
            tension: 0.4,
          },
        ],
      }}
      options={{
        scales: {
          y: {
            beginAtZero: true,
            max: 100,
          },
        },
        plugins: {
          tooltip: {
            enabled: true,
            callbacks: {
              label: function (context) {
                const labelIndex = context.dataIndex;
                const value = context.dataset.data[labelIndex];
                return `Usage: ${value}%`;
              },
              title: function (tooltipItems) {
                let title = '';
                tooltipItems.forEach(function (tooltipItem, index) {
                  const labelValue = tooltipItem.label;
                  title += `Second: ${labelValue}\n`;
                });
                return title.trim();
              },
            },
          },
          legend: {
            labels: {
              usePointStyle: true,
              boxWidth: 11,
              boxHeight: 11,
            },
          },
        },
      }}
    ></Line>
  );
};

export default CpuChart;

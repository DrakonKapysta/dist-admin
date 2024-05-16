import React, { useEffect, useRef, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import SystemService from '../../../API/SystemService';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
);
const SECONDS = 30;

const CpuChart = ({ socketId }: { socketId: string }) => {
  const timerRef = useRef<number | undefined | NodeJS.Timeout>(undefined);
  const [usage, setUsage] = useState(Array(SECONDS).fill(0));
  useEffect(() => {
    timerRef.current = setInterval(async () => {
      const usage = await SystemService.getCpuUsage(socketId);
      console.log(usage);

      setUsage((prev): any => {
        const newData = [...prev];
        newData.shift(); // Удаляем первый элемент
        newData.push(usage); // Добавляем новое случайное значение в конец
        return [...newData];
      });
    }, 2000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  return (
    <Line
      data={{
        labels: Array.from({ length: SECONDS }, (_, i) => `${SECONDS - i}`),
        datasets: [
          {
            label: 'CPU Load (%)',
            data: usage.map((load: any) => load.currentLoad),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.5)',
            borderWidth: 1,
            fill: true,
            pointRadius: 0,
            tension: 0.1,
          },
        ],
      }}
      options={{
        animation: {
          duration: 0, // Отключаем анимацию
        },
        scales: {
          y: {
            beginAtZero: true,
            suggestedMax: 100, // Максимальное значение по оси Y
          },
          x: {
            display: true,
            title: {
              display: true,
              text: 'Seconds',
            },
          },
        },
        plugins: {
          title: {
            display: true,
            text: 'Real-Time CPU Load',
          },
          legend: {
            position: 'top',
          },
          tooltip: {
            enabled: false, // Отключаем всплывающие подсказки
          },
        },
        elements: {
          line: {
            tension: 0.4, // Makes the line chart straight
          },
        },
      }}
    ></Line>
  );
};

export default CpuChart;

import React, { useEffect, useRef, useState } from 'react';
import cl from './MemoryChart.module.css';
import { Pie } from 'react-chartjs-2';
import SystemService from '../../../API/SystemService';
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
  ArcElement,
} from 'chart.js';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
  ArcElement,
);
const MemoryChart = () => {
  const [memoryStats, setMemoryStats] = useState<any>();
  const timerRef = useRef<number | undefined | NodeJS.Timeout>(undefined);
  useEffect(() => {
    timerRef.current = setInterval(async () => {
      const memory = await SystemService.getServerMemoryMetrics();

      setMemoryStats(memory);
    }, 1000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  const chartData = {
    labels: ['Used memory(GB)', 'Free memory(GB)'],
    datasets: [
      {
        data: [memoryStats?.used || 0, memoryStats?.free || 0],
        backgroundColor: ['#ff6384', '#00FF7F', '#cc65fe', '#ffce56'],
        hoverBackgroundColor: ['#cc65fe', '#cc65fe', '#cc65fe', '#ffce56'],
      },
    ],
  };
  return (
    <div className={cl.wrapper}>
      <Pie
        className={cl.pieChart}
        data={chartData}
        options={{
          plugins: {
            legend: {},
          },
        }}
      />
      <div className={cl.memoryInfoWrapper}>
        <div className={cl.memoryInfoContainer}>
          <div className={cl.memoryInfo}>
            <p className={cl.memoryInfoContent}>
              <span>Used</span>
              <br />
              {memoryStats?.used} GB
            </p>
            <p className={cl.memoryInfoContent}>
              <span>Total</span>
              <br />
              {memoryStats?.total} GB
            </p>
            <p className={cl.memoryInfoContent}>
              <span>Free</span>
              <br />
              {memoryStats?.free} GB
            </p>
          </div>
          <div className={cl.memoryInfo}>
            <p className={cl.memoryInfoContent}>
              <span>Cached</span>
              <br />
              {memoryStats?.cached} GB
            </p>
            <p className={cl.memoryInfoContent}>
              <span>Buffers</span>
              <br />
              {memoryStats?.buffers} GB
            </p>
            <p className={cl.memoryInfoContent}>
              <span>Active</span>
              <br />
              {memoryStats?.active} GB
            </p>
          </div>
          <div className={cl.memoryInfo}>
            <p className={cl.memoryInfoContent}>
              <span>Available</span>
              <br />
              {memoryStats?.available} GB
            </p>
            <p className={cl.memoryInfoContent}>
              <span>Form Factor</span>
              <br />
              {memoryStats?.fromFactor[0]}
            </p>
            <p className={cl.memoryInfoContent}>
              <span>Used slots</span>
              <br />
              {memoryStats?.length}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemoryChart;

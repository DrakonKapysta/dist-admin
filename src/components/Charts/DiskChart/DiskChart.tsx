import React, { useEffect, useRef, useState } from 'react';
import { Pie } from 'react-chartjs-2';
import SystemService from '../../../API/SystemService';
import { produce } from 'immer';
import cl from './DiskChart.module.css';
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

const DiskChart = () => {
  const [diskStats, setDiskStats] = useState<any>([]);
  const timerRef = useRef<number | undefined | NodeJS.Timeout>(undefined);
  const readSpeedRef = useRef(0);
  const writeSpeedRef = useRef(0);
  useEffect(() => {
    (async () => {
      const { diskActivity, readSpeed, writeSpeed } =
        await SystemService.getServerDiskMetrics();
      readSpeedRef.current = (readSpeed / 1024 / 1024) * 8;
      writeSpeedRef.current = (writeSpeed / 1024 / 1024) * 8;
      setDiskStats([...diskActivity]);
    })();
    timerRef.current = setInterval(async () => {
      const { diskActivity, readSpeed, writeSpeed } =
        await SystemService.getServerDiskMetrics();
      readSpeedRef.current = (readSpeed / 1024 / 1024) * 8;
      writeSpeedRef.current = (writeSpeed / 1024 / 1024) * 8;
      setDiskStats([...diskActivity]);
    }, 1000);

    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  const chartData = {
    labels: [
      ...diskStats.map((disk: any) => disk.filesystem + ' used(%)'),
      ...diskStats.map((disk: any) => disk.filesystem + ' free(%)'),
    ],
    datasets: [
      {
        data: [
          ...diskStats.map((disk: any) => disk.usage),
          ...diskStats.map((disk: any) => 100 - disk.usage),
        ],
        backgroundColor: ['#ff6384', '#00FF7F', '#cc65fe', '#ffce56'],
        hoverBackgroundColor: ['#cc65fe', '#cc65fe', '#cc65fe', '#ffce56'],
      },
    ],
  };

  return (
    <div className={cl.chartWrapper}>
      <Pie
        className={cl.pieChart}
        data={chartData}
        options={{
          plugins: {
            legend: {},
          },
        }}
      />
      <div className={cl.dynamicInfoContainer}>
        <div className={cl['vertical-line']}>
          <div className={cl.diskStatContainer}>
            <span className={cl.diskValueTitle}>Read speed</span>
            <span>
              {readSpeedRef.current < 1
                ? (readSpeedRef.current * 1024).toFixed(1) + ' KBit/s'
                : readSpeedRef.current.toFixed(1) + ' Mbit/s'}
            </span>
          </div>
        </div>
        <div className={cl['vertical-dashed-line']}>
          <div className={cl.diskStatContainer}>
            <span className={cl.diskValueTitle}>Write speed</span>
            <span>
              {writeSpeedRef.current < 1
                ? (writeSpeedRef.current * 1024).toFixed(1) + ' KBit/s'
                : writeSpeedRef.current.toFixed(1) + ' Mbit/s'}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiskChart;

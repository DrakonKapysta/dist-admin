import React, { useEffect, useRef, useState } from 'react';
import { produce } from 'immer';
import cl from './NetworkChart.module.css';
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

const NetworkChart = () => {
  const [networkStats, setNetworkStats] = useState<any>(Array(SECONDS).fill(0));
  const timerRef = useRef<number | undefined | NodeJS.Timeout>(undefined);
  const transferred = useRef(0);
  const received = useRef(0);
  const connectionType = useRef('');
  useEffect(() => {
    timerRef.current = setInterval(async () => {
      const network = await SystemService.getServerNewtrowkMetrics();
      transferred.current = (network[0].tx / 1024 / 1024) * 8;
      received.current = (network[0].rx / 1024 / 1024) * 8;
      connectionType.current = network[0].interface;
      setNetworkStats(
        produce((prev: any) => {
          prev.shift();
          prev.push(...network); // Добавляем новое случайное значение в конец
        }),
      );
    }, 2000);
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);
  return (
    <div className={cl.chartWrapper}>
      <div className={cl.chartContainer}>
        <Line
          data={{
            labels: Array.from({ length: SECONDS }, (_, i) => `${SECONDS - i}`),
            datasets: [
              {
                label: 'Transferred bytes (MBit/s)',
                data: networkStats.map(
                  (data: any) => (data.tx / 1024 / 1024) * 8,
                ),
                borderColor: 'rgb(139,69,19, 1)',
                backgroundColor: 'rgb(139,69,19, 0.5)',
                borderWidth: 1.2,
                borderDash: [5, 5],
                fill: false,
                pointRadius: 0,
                tension: 0.1,
              },
              {
                label: 'Received bytes (MBit/s)',
                data: networkStats.map(
                  (data: any) => (data.rx / 1024 / 1024) * 8,
                ),
                borderColor: 'rgb(139,69,19, 1)',
                backgroundColor: 'rgb(139,69,19, 0.1)',
                borderWidth: 1,
                fill: true,
                pointRadius: 0,
                tension: 0.1,
              },
            ],
          }}
          options={{
            animation: {
              duration: 0,
            },
            scales: {
              y: {
                beginAtZero: true,
                display: true,
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
                text: 'Network Traffic',
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
      </div>

      <div className={cl.wrapper}>
        <div className={cl.dynamicInfoContainer}>
          <div className={cl['vertical-line']}>
            <div className={cl.networkStatContainer}>
              <span className={cl.networkValueTitle}>Transferred</span>
              <span className={cl.transferredValue}>
                {transferred.current < 1
                  ? (transferred.current * 1024).toFixed(1) + ' KBit/s'
                  : transferred.current.toFixed(1) + ' Mbit/s'}
              </span>
            </div>
          </div>
          <div className={cl['vertical-dashed-line']}>
            <div className={cl.networkStatContainer}>
              <span className={cl.networkValueTitle}>Received</span>
              <span className={cl.receivedValue}>
                {received.current < 1
                  ? (received.current * 1024).toFixed(1) + ' KBit/s'
                  : received.current.toFixed(1) + ' Mbit/s'}
              </span>
            </div>
          </div>
        </div>
        <div className={cl.networkAdvanceStatsWrapper}>
          <div className={cl.networkAdvanceStatsContainer}>
            <span className={cl.networkValueTitle}>Connection type:</span>
            <span className={cl.interface}>
              {connectionType.current.includes('eth')
                ? 'Ethernet'
                : connectionType.current}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
export default NetworkChart;

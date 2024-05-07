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

const RequestChart = ({ requests }: any) => {
  return (
    <div>
      <Bar
        data={{
          labels: [
            'Total request count',
            'Successful requests',
            'Error requests',
          ],
          datasets: [
            {
              label: 'Requests info',
              data: [
                requests?.totalRequestCount || 0,
                requests?.totalSuccessfulRequests || 0,
                requests?.totalErrorRequests || 0,
              ],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: ['rgb(255, 99, 132)', 'rgb(255, 159, 64)'],
              borderWidth: 1,
            },
          ],
        }}
        options={{
          plugins: {
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (context) {
                  const labelIndex = context.dataIndex;
                  const value = context.dataset.data[labelIndex];
                  return `Count: ${value}`;
                },
              },
            },
            legend: {
              labels: {
                boxWidth: 0,
              },
            },
          },
        }}
      />
    </div>
  );
};

export default RequestChart;

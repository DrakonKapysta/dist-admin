import { FC, useEffect, useRef, useState } from 'react';
import cl from './ConnectionIdPage.module.css';
import { useParams } from 'react-router-dom';
import { ConnectionType, socketStore } from '../../stores/socketStore';
import SystemInfoList from '../../components/SystemInfoList/SystemInfoList';
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

const ConnectionIdPage: FC = () => {
  const [chartVisible, setChartVisible] = useState(false);
  const params = useParams();
  const clientInfo: any = socketStore((state) =>
    state.connections.find(
      (connetion: { socketId: string | undefined }) =>
        connetion.socketId === params.id,
    ),
  );
  return (
    <div className={cl.wrapper}>
      <button
        className={cl.showChartButton}
        onClick={() => setChartVisible(!chartVisible)}
      >
        Show chart
      </button>
      {chartVisible && (
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
                    clientInfo?.requests?.totalRequestCount || 0,
                    clientInfo?.requests?.totalSuccessfulRequests || 0,
                    clientInfo?.requests?.totalErrorRequests || 0,
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
              },
            }}
          />
        </div>
      )}
      <SystemInfoList title={'System'} objectList={clientInfo?.system} />
      <SystemInfoList title={'Cpu'} objectList={clientInfo?.cpu} />
      <SystemInfoList title={'OS'} objectList={clientInfo?.osInfo} />
      <SystemInfoList title={'Memory'} objectList={clientInfo?.mem} />
    </div>
  );
};

export default ConnectionIdPage;

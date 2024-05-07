import { FC, useEffect, useRef, useState } from 'react';
import cl from './ConnectionIdPage.module.css';
import { useParams } from 'react-router-dom';
import { ConnectionType, socketStore } from '../../stores/socketStore';
import SystemInfoList from '../../components/SystemInfoList/SystemInfoList';
import RequestChart from '../../components/Charts/RequestChart/RequestChart';
import CpuChart from '../../components/Charts/CpuChart/CpuChart';
import ShowChartButton from '../../components/ShowChartButton/ShowChartButton';
import NetworkChart from '../../components/Charts/NetworkChart/NetworkChart';

const ConnectionIdPage: FC = () => {
  const [chartsVisible, setChartsVisible] = useState({
    reqChartVisible: false,
    cpuChartVisible: false,
    networkChartVisible: false,
  });
  const params = useParams();
  const clientInfo: any = socketStore((state) =>
    state.connections.find(
      (connetion: { socketId: string | undefined }) =>
        connetion.socketId === params.id,
    ),
  );
  return (
    <div className={cl.wrapper}>
      <div className={cl.chartButtonsContainer}>
        <ShowChartButton
          text="Show requests chart"
          chartVisible={chartsVisible.reqChartVisible}
          setChartsVisible={setChartsVisible}
          chartType="reqChartVisible"
        />
        <ShowChartButton
          text="Show cpu chart"
          chartVisible={chartsVisible.cpuChartVisible}
          setChartsVisible={setChartsVisible}
          chartType="cpuChartVisible"
        />
        <ShowChartButton
          text="Show network chart"
          chartVisible={chartsVisible.networkChartVisible}
          setChartsVisible={setChartsVisible}
          chartType="networkChartVisible"
        />
      </div>

      {chartsVisible.reqChartVisible && (
        <RequestChart requests={clientInfo?.requests} />
      )}
      {chartsVisible.cpuChartVisible && <CpuChart socketId={params.id || ''} />}
      {chartsVisible.networkChartVisible && <NetworkChart />}
      <SystemInfoList title={'System'} objectList={clientInfo?.system} />
      <SystemInfoList title={'Cpu'} objectList={clientInfo?.cpu} />
      <SystemInfoList title={'OS'} objectList={clientInfo?.osInfo} />
      <SystemInfoList title={'Memory'} objectList={clientInfo?.mem} />
    </div>
  );
};

export default ConnectionIdPage;

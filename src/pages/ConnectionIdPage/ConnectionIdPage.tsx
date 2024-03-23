import { FC } from 'react';
import cl from './ConnectionIdPage.module.css';
import { useParams } from 'react-router-dom';
import { ConnectionType, socketStore } from '../../stores/socketStore';
import SystemInfoList from '../../components/SystemInfoList/SystemInfoList';

const ConnectionIdPage: FC = () => {
  const params = useParams();
  const clientInfo: any = socketStore((state) =>
    state.connctions.find(
      (connetion: { socketId: string | undefined }) =>
        connetion.socketId === params.id,
    ),
  );
  return (
    <div className={cl.wrapper}>
      {/* <p>Worker id: {clientInfo?.socketId}</p>
      <p>Worker ip: {clientInfo?.clientIp}</p> */}

      <SystemInfoList title={'System'} objectList={clientInfo.system} />
      <SystemInfoList title={'Cpu'} objectList={clientInfo.cpu} />
      <SystemInfoList title={'OS'} objectList={clientInfo.osInfo} />
      <SystemInfoList title={'Memory'} objectList={clientInfo.mem} />
    </div>
  );
};

export default ConnectionIdPage;

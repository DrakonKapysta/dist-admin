import { FC } from 'react';
import cl from './ConnectionIdPage.module.css';
import { useParams } from 'react-router-dom';
import { ConnectionType, socketStore } from '../../stores/socketStore';

const ConnectionIdPage: FC = () => {
  const params = useParams();
  const clientInfo: ConnectionType | undefined = socketStore((state) =>
    state.connctions.find((connetion) => connetion.socketId === params.id),
  );
  return (
    <div>
      <p>
        Page for connection with id: {clientInfo?.socketId} and ip:
        {clientInfo?.clientIp}
      </p>
    </div>
  );
};

export default ConnectionIdPage;

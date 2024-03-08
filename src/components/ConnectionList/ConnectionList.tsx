import cl from './ConnectionList.module.css';
import { ConnectionType } from '../../stores/socketStore';
import { FC } from 'react';
import ConnectionItem from './ConnectionItem/ConnectionItem';

interface ConnectionListProps {
  connections: ConnectionType[];
}

const ConnectionList: FC<ConnectionListProps> = ({ connections }) => {
  return (
    <div className={cl.wrapper}>
      {connections.map((connection) => (
        <ConnectionItem
          key={connection.socketId}
          ip={connection.clientIp}
          clientId={connection.socketId}
        />
      ))}
    </div>
  );
};

export default ConnectionList;

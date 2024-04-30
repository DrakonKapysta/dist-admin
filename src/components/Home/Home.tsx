import { FC } from 'react';
import { socketStore } from '../../stores/socketStore';
import cl from './Home.module.css';

const Home: FC = () => {
  const connections = socketStore((state) => state.connections);
  return (
    <div className={cl.content}>
      {connections.map((connection: any) => (
        <div key={connection.socketId}>
          <p>cpuCount: {connection.cpuCount}</p>
          <p>data: {connection.data}</p>
        </div>
      ))}
    </div>
  );
};

export default Home;

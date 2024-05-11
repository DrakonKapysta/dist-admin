import ConnectionList from '../../components/ConnectionList/ConnectionList';
import { socketStore } from '../../stores/socketStore';
import cl from './ConnectionsPage.module.css';

const Connections = () => {
  const clientConnections = socketStore((state) => state.connections);
  return (
    <div className={cl.wrapper}>
      {Boolean(clientConnections.length > 0) ? (
        <ConnectionList connections={clientConnections} />
      ) : (
        <p>There are no active conncetions</p>
      )}
    </div>
  );
};

export default Connections;

import ConnectionList from '../../components/ConnectionList/ConnectionList';
import { socketStore } from '../../stores/socketStore';
import cl from './ConnectionsPage.module.css';

const Connections = () => {
  const clientConnections = socketStore((state) => state.connctions);
  return (
    <div className={cl.wrapper}>
      <ConnectionList connections={clientConnections} />
    </div>
  );
};

export default Connections;

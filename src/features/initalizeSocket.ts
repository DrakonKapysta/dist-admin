import { io } from 'socket.io-client';
import { socketStore } from '../stores/socketStore';
export default function initializeSocket() {
  const {
    setConnections,
    addConnection,
    removeConnection,
    updateRequestCount,
  } = socketStore.getState();
  //https://dist-serv.adaptable.app/admin
  const socket = io('http://localhost:3000/admin');
  socket.on('connect', () => {
    console.log('admin:connect');
    console.log('Connected');
  });
  socket.on('admin:connections', (connections) => {
    console.log('admin:connections');
    setConnections(connections);
  });
  socket.on('admin:newConnection', (connection) => {
    console.log('admin:newConnection');
    addConnection(connection);
  });
  socket.on('admin:removeConnection', (id) => {
    console.log('admin:removeConnection');

    removeConnection(id);
  });
  socket.on('admin:workerRequest', (payload: any) => {
    console.log('admin:workerRequest'); // fix rerender caused by zustand... Rerendering ConnectionItem.tsx component
    updateRequestCount(payload.workerId, payload.requests);
  });
}

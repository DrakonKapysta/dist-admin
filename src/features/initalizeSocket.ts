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
    console.log('Connected');
  });
  socket.on('admin:connections', (connections) => {
    setConnections(connections);
  });
  socket.on('admin:newConnection', (connection) => {
    addConnection(connection);
  });
  socket.on('admin:removeConnection', (id) => {
    removeConnection(id);
  });
  socket.on('admin:workerRequest', (payload: any) => {
    console.log('req');
    updateRequestCount(payload.workerId, payload.requests);
  });
}

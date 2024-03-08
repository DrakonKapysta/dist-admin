import { create } from 'zustand';

export interface ConnectionType {
  socketId: string;
  data: any;
  cpuCount: number;
  clientIp: string;
}

interface SocketState {
  connctions: ConnectionType[];
  setConnections: (connections: ConnectionType[]) => void;
  addConnection: (connection: ConnectionType) => void;
  removeConnection: (id: string) => void;
}

export const socketStore = create<SocketState>((set) => ({
  connctions: [],
  setConnections: (connections: ConnectionType[]) =>
    set(() => {
      return { connctions: connections };
    }),
  addConnection: (connection: ConnectionType) => {
    set((state) => {
      return { connctions: [...state.connctions, connection] };
    });
  },
  removeConnection: (id: string) => {
    set((state) => {
      const newConnections = state.connctions.filter(
        (connection) => connection.socketId !== id,
      );
      return { connctions: newConnections };
    });
  },
}));

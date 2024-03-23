import { create } from 'zustand';

export interface ConnectionType {
  socketId: string;
  data: any;
  cpuCount: number;
  clientIp: string;
}

interface SocketState {
  connctions: any;
  setConnections: (connections: any) => void;
  addConnection: (connection: any) => void;
  removeConnection: (id: string) => void;
}

export const socketStore = create<SocketState>((set) => ({
  connctions: [],
  setConnections: (connections: any) =>
    set(() => {
      return { connctions: connections };
    }),
  addConnection: (connection: any) => {
    set((state) => {
      return { connctions: [...state.connctions, connection] };
    });
  },
  removeConnection: (id: string) => {
    set((state) => {
      const newConnections = state.connctions.filter(
        (connection: { socketId: string }) => connection.socketId !== id,
      );
      return { connctions: newConnections };
    });
  },
}));

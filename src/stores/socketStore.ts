import { produce } from 'immer';
import { create } from 'zustand';

export interface ConnectionType {
  socketId: string;
  data: any;
  cpuCount: number;
  clientIp: string;
}

interface SocketState {
  connections: any;
  logs: any;
  setConnections: (connections: any) => void;
  addConnection: (connection: any) => void;
  removeConnection: (id: string) => void;
  increaseRequestCount: (workerId: any) => void;
  increaseRequestErrorCount: (workerId: any) => void;
  increaseRequestSuccessfulCount: (workerId: any) => void;
  updateRequestCount: (id: any, requests: any) => void;
}

export const socketStore = create<SocketState>((set) => ({
  connections: [],
  logs: [],
  setConnections: (connections: any) =>
    set(() => {
      return { connections: connections };
    }),
  addConnection: (connection: any) => {
    set((state) => {
      return { connections: [...state.connections, connection] };
    });
  },
  removeConnection: (id: string) => {
    set((state) => {
      const newConnections = state.connections.filter(
        (connection: { socketId: string }) => connection.socketId !== id,
      );
      return { connections: newConnections };
    });
  },
  updateRequestCount: (id: any, requests: any) => {
    set(
      produce((state) => {
        const workerInfo = state.connections.find(
          (connection: any) => connection.socketId === id,
        );
        if (workerInfo) {
          workerInfo.requests = requests;
        }
      }),
    );
  },
  increaseRequestCount: (workerId: any) => {
    set(
      produce((state) => {
        const workerInfo = state.connections.find(
          (connection: any) => connection.socketId === workerId,
        );
        if (workerInfo) {
          workerInfo.totalRequestCount += 1;
        }
      }),
    );
  },
  increaseRequestErrorCount: (workerId: any) => {
    set(
      produce((state) => {
        const workerInfo = state.connections.find(
          (connection: any) => connection.socketId === workerId,
        );
        if (workerInfo) {
          workerInfo.totalErrorRequests += 1;
        }
      }),
    );
  },
  increaseRequestSuccessfulCount: (workerId: any) => {
    set(
      produce((state) => {
        const workerInfo = state.connections.find(
          (connection: any) => connection.socketId === workerId,
        );
        if (workerInfo) {
          workerInfo.totalSuccessfulRequests += 1;
        }
      }),
    );
  },
}));

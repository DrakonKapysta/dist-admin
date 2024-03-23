import { CPU } from './cpuTypes';

export interface ConnectionType {
  socketId: string;
  data: any;
  cpu: CPU;
  clientIp: string;
  memoryUsage: string;
  availableMemory: string;
  tasksCompleted: number;
  tasksInProgress: number;
}

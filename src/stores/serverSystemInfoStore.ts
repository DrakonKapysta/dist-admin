import { produce } from 'immer';
import { create } from 'zustand';

export const serverSystemInfoStore = create((set) => ({
  systemMetrics: {
    cpuLoad: [],
    memoryUsage: [],
    diskActivity: [],
    networkStats: [],
  },
  setSystemMetrics: (newSystemMetrics: any) => {
    set(
      produce((state: any) => {
        state.systemMetrics.cpuLoad.push(newSystemMetrics.cpuLoad);
        state.systemMetrics.memoryUsage.push(newSystemMetrics.memoryUsage);
        state.systemMetrics.diskActivity.push(...newSystemMetrics.diskActivity);
        state.systemMetrics.networkStats.push(...newSystemMetrics.networkStats);
      }),
    );
  },
}));

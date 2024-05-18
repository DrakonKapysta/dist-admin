export default class SystemService {
  static async getCpuUsage(socketId: string, server = false) {
    if (!server) {
      const response = await fetch(
        `http://194.61.53.65:3000/system/cpu-usage?socketId=${socketId}`,
      );
      if (response.ok) {
        return await response.json();
      }
      return [];
    }
    const response = await fetch(
      `http://194.61.53.65:3000/system/server/cpu-usage`,
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  }
  static async getServerSystemMetrics() {
    const response = await fetch(`http://194.61.53.65:3000/system/server`);
    if (response.ok) {
      return await response.json();
    }
    return [];
  }
  static async getServerNewtrowkMetrics() {
    const response = await fetch(
      `http://194.61.53.65:3000/system/server-network`,
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  }
  static async getServerDiskMetrics() {
    const response = await fetch(`http://194.61.53.65:3000/system/server-disk`);
    if (response.ok) {
      return await response.json();
    }
    return [];
  }
  static async getServerMemoryMetrics() {
    const response = await fetch(
      `http://194.61.53.65:3000/system/server-memory`,
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  }
}

export default class SystemService {
  static async getCpuUsage(socketId: string) {
    const response = await fetch(
      `http://194.61.53.65:3000/system/cpu-usage?socketId=${socketId}`,
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
}

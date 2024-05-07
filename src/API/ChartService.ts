export default class ChartService {
  static async getCpuUsage(socketId: string) {
    const response = await fetch(
      `http://localhost:3000/system/cpu-usage?socketId=${socketId}`,
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  }
}

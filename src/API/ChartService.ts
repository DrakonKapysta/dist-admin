export default class ChartService {
  static async getCpuUsage(socketId: string) {
    const response = await fetch(
      `http://194.61.53.65:3000/system/cpu-usage?socketId=${socketId}`,
    );
    if (response.ok) {
      return await response.json();
    }
    return [];
  }
}

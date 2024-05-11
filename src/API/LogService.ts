export default class LogService {
  static async getAll() {
    const response = await fetch('http://194.61.53.65:3000/logs');
    if (response.ok) {
      const newLogs = await response.json();
      return newLogs;
    }
    return [];
  }
  static async deleteLog(type: string, date: Date) {
    const response = await fetch(
      `http://194.61.53.65:3000/logs/remove?date=${date}&type=${type}`,
      {
        method: 'DELETE',
      },
    );
    if (response.ok) {
      const deletedLog = await response.json();
      return deletedLog;
    }
  }
  static async deleteManyLogs(type: string, date: string, endDate: string) {
    const response = await fetch(
      `http://194.61.53.65:3000/logs/remove?date=${date}&type=${type}&endDate=${endDate}`,
      {
        method: 'DELETE',
      },
    );
    if (response.ok) {
      const deletedLog = await response.json();
      return deletedLog;
    }
  }
}

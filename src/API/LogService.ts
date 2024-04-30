export default class LogService {
  static async getAll() {
    const response = await fetch('http://localhost:3000/logs');
    if (response.ok) {
      const newLogs = await response.json();
      return newLogs;
    }
    return [];
  }
  static async deleteLog(type: string, date: string, time: string) {
    const response = await fetch(
      `http://localhost:3000/logs/remove?date=${date}&time=${time}&type=${type}`,
      {
        method: 'DELETE',
      },
    );
    if (response.ok) {
      const deletedLog = await response.json();
      return deletedLog;
    }
  }
  static async deleteManyLogs(
    type: string,
    date: string,
    time: string,
    endDate: string,
    endTime: string,
  ) {
    const response = await fetch(
      `http://localhost:3000/logs/remove?date=${date}&time=${time}&type=${type}&endDate=${endDate}&endTime=${endTime}`,
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

import React, { useEffect, useState } from 'react';
import cl from './LogsPage.module.css';
import { socketStore } from '../../stores/socketStore';
import { useFetcthing } from '../../hooks/useFetching';
import LogService from '../../API/LogService';
import LogForm from '../../components/LogForm/LogForm';

const LogsPage = () => {
  const [logs, setLogs] = useState<any>([]);
  const [isDeleting, setIsDeleting] = useState(false);
  const [fetchLogs, isLogsLoading, logsError] = useFetcthing(async () => {
    const logs = await LogService.getAll();
    setLogs(logs);
  });
  const [removeLog, isLogsRemoving, logsRemoveError] = useFetcthing(
    async (formData: any, selectedDeleteVariant: string) => {
      const [date, time] = formData.dateAndTime.split(' ');
      const [endDate, endTime] = formData.dateAndTime.split(' ');
      if (selectedDeleteVariant == 'range') {
      } else if (selectedDeleteVariant == 'single') {
        const deletedLog = await LogService.deleteLog(
          selectedDeleteVariant,
          date,
          time,
        );
        console.log(deletedLog);
        setLogs((prevLogs: any) => {
          return prevLogs.filter(
            (prevLog: any) => prevLog._id != deletedLog._id,
          );
        });
      }
    },
  );
  const loading = isLogsRemoving || isLogsLoading;

  useEffect(() => {
    fetchLogs();
  }, []);
  return (
    <div className={cl.wrapper}>
      <button onClick={() => setIsDeleting(!isDeleting)}>Delete log</button>

      {isDeleting && <LogForm removeLog={removeLog} />}
      {logsError && <h1>Error loading logs {logsError}</h1>}
      {logsRemoveError && <h1>Error removing logs {logsRemoveError}</h1>}
      {loading ? (
        <div>Loading logs...</div>
      ) : (
        logs.map((log: any) => (
          <p>
            Time: {log.time} <br /> Date: {log.date} <br /> Log: {log.log}
          </p>
        ))
      )}
    </div>
  );
};

export default LogsPage;
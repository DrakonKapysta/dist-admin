import React, { useEffect, useState } from 'react';
import cl from './LogsPage.module.css';
import { socketStore } from '../../stores/socketStore';
import { useFetcthing } from '../../hooks/useFetching';
import LogService from '../../API/LogService';
import LogForm from '../../components/LogForm/LogForm';

const LogsPage = () => {
  const [logs, setLogs] = useState<any>([]);
  const [searchLog, setSearchLog] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [fetchLogs, isLogsLoading, logsError] = useFetcthing(async () => {
    const logs = await LogService.getAll();
    setLogs(logs);
  });
  const [removeLog, isLogsRemoving, logsRemoveError] = useFetcthing(
    async (formData: any, selectedDeleteVariant: string) => {
      let deletedLog = null;
      if (selectedDeleteVariant == 'range') {
        deletedLog = await LogService.deleteManyLogs(
          selectedDeleteVariant,
          formData.dateAndTime,
          formData.endDateAndTime,
        );
        console.log(deletedLog);
      } else if (selectedDeleteVariant == 'single') {
        deletedLog = await LogService.deleteLog(
          selectedDeleteVariant,
          formData.dateAndTime,
        );
        console.log(deletedLog);
      }
      setLogs((prevLogs: any) => {
        return prevLogs.filter((prevLog: any) => prevLog._id != deletedLog._id);
      });
    },
  );
  const loading = isLogsRemoving || isLogsLoading;
  const searchedLogs = logs.filter((log: any) =>
    log.log.toLowerCase().includes(searchLog.toLowerCase()),
  );
  console.log(searchedLogs);

  useEffect(() => {
    fetchLogs();
  }, []);
  return (
    <div className={cl.wrapper}>
      <button
        className={cl.deleteFormOpenButton}
        onClick={() => setIsDeleting(!isDeleting)}
      >
        Delete log
      </button>
      <div className={cl.formsContainer}>
        <div className={cl.logFindInputContainer}>
          <label className={cl.logFindLabel} htmlFor="logFindInput">
            Enter log to find
          </label>
          <input
            className={cl.logFindInput}
            placeholder="Finding logs..."
            name="logFindInput"
            type="text"
            value={searchLog}
            onChange={(e) => setSearchLog(e.target.value)}
          />
        </div>
        {isDeleting && <LogForm removeLog={removeLog} />}
        {logsError && (
          <p style={{ color: 'red' }}>Error loading logs {logsError}</p>
        )}
        {logsRemoveError && (
          <p style={{ color: 'red' }}>Error removing logs {logsRemoveError}</p>
        )}
      </div>

      {loading ? (
        <div>Loading logs...</div>
      ) : (
        <div className={cl.logsContainer}>
          {Boolean(searchedLogs.length) ? (
            searchedLogs.map((log: any) => (
              <p>
                Date: {log.date} <br /> Log: {log.log}
              </p>
            ))
          ) : (
            <p>There are no logs found...</p>
          )}
        </div>
      )}
    </div>
  );
};

export default LogsPage;

import React, { useEffect, useRef, useState } from 'react';
import NetworkChart from '../../components/Charts/NetworkChart/NetworkChart';
import { useFetcthing } from '../../hooks/useFetching';
import SystemService from '../../API/SystemService';
import { serverSystemInfoStore } from '../../stores/serverSystemInfoStore';
import { produce } from 'immer';
import cl from './StatisticPage.module.css';
import DiskChart from '../../components/Charts/DiskChart/DiskChart';
import MemoryChart from '../../components/Charts/MemoryChart/MemoryChart';

const StatisticPage = () => {
  return (
    <div className={cl.wrapper}>
      <div className={cl.chartsContainer}>
        <NetworkChart />
        <div className={cl.chartGroup}>
          <DiskChart />
          <MemoryChart />
        </div>
      </div>
    </div>
  );
};

export default StatisticPage;

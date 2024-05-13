import React, { useEffect, useRef, useState } from 'react';
import NetworkChart from '../../components/Charts/NetworkChart/NetworkChart';
import { useFetcthing } from '../../hooks/useFetching';
import SystemService from '../../API/SystemService';
import { serverSystemInfoStore } from '../../stores/serverSystemInfoStore';
import { produce } from 'immer';
import cl from './StatisticPage.module.css';

const StatisticPage = () => {
  return (
    <div className={cl.wrapper}>
      <div style={{ paddingRight: 10 }}>
        <NetworkChart />
      </div>
    </div>
  );
};

export default StatisticPage;

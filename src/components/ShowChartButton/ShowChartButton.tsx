import React from 'react';
import classNames from 'classnames';
import cl from './ShowChartButton.module.css';

const ShowChartButton = ({
  text,
  chartVisible,
  setChartsVisible,
  chartType,
}: any) => {
  return (
    <button
      className={classNames(cl.showChartButton, {
        [cl.chartButtonActive]: chartVisible,
      })}
      onClick={() =>
        setChartsVisible((prev: any) => ({
          ...prev,
          [chartType]: !prev[chartType],
        }))
      }
    >
      {text}
    </button>
  );
};

export default ShowChartButton;

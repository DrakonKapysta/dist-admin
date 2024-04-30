import classNames from 'classnames';
import SystemInfoItem from '../SystemInfoItem/SystemInfoItem';
import cl from './SystemInfoList.module.css';
import { useState } from 'react';
const SystemInfoList = ({ title, objectList }: any) => {
  const [isOpen, setIsOpen] = useState(true);
  return (
    <div className={cl.wrapper}>
      <div className={classNames(cl.titleWrapper)}>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={classNames({
            [cl.opened]: isOpen,
            [cl.closed]: !isOpen,
          })}
        >
          {title}
        </button>
      </div>
      {isOpen &&
        Object.entries(objectList || []).map(([key, value]) => (
          <SystemInfoItem
            key={key + '_' + value}
            paramName={key}
            value={value}
          />
        ))}
    </div>
  );
};

export default SystemInfoList;

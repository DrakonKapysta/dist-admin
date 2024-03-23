import { FC } from 'react';
import cl from './SystemInfoItem.module.css';

interface SystemInfoItemProps {
  paramName: any;
  value: any;
}

const SystemInfoItem: FC<SystemInfoItemProps> = ({ paramName, value }) => {
  return (
    <div>
      <p>
        <span className={cl.param}>{paramName}: </span>
        <span className={cl.value}>{value}</span>
      </p>
    </div>
  );
};

export default SystemInfoItem;

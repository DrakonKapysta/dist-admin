import { FC } from 'react';
import cl from './ConnectionItem.module.css';
import { useNavigate } from 'react-router-dom';

interface ConnectionItemProps {
  ip: string;
  clientId: string;
}

const ConnectionItem: FC<ConnectionItemProps> = ({ ip, clientId }) => {
  const navigate = useNavigate();
  return (
    <div
      className={cl.wrapper}
      onClick={() => {
        navigate(`/connections/${clientId}`);
      }}
    >
      <span>Ip: {ip}</span>
    </div>
  );
};

export default ConnectionItem;

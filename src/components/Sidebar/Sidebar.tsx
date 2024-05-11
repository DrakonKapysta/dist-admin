import { Link } from 'react-router-dom';
import cl from './Sidebar.module.css';
import ReactStatIcon from '../../assets/images/statisticIcon.svg?react';
import ReactConnectionIcon from '../../assets/images/connectionIcon.svg?react';
import ReactLogsIcon from '../../assets/images/logsIcon.svg?react';
import ReactSettingsIcon from '../../assets/images/settingsIcon.svg?react';

const Sidebar = () => {
  return (
    <div className={cl.sidebar}>
      <div className={cl.sidebar__logo}>
        <Link to={'/'}>Home</Link>
      </div>
      <Link className={cl.sidebar__button} to={'connections'}>
        <ReactConnectionIcon className={cl.svgImage} /> <span>Connections</span>
      </Link>
      <Link className={cl.sidebar__button} to={'statistic'}>
        <ReactStatIcon className={cl.svgImage} /> <span>Statistic</span>
      </Link>
      <Link className={cl.sidebar__button} to={'logs'}>
        <ReactLogsIcon className={cl.svgImage} /> <span>Logs</span>
      </Link>
      <div className={cl.sidebar__settings}>
        <Link className={cl.sidebar__button} to={'settings'}>
          <ReactSettingsIcon className={cl.svgImage} /> <span>Settings</span>
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;

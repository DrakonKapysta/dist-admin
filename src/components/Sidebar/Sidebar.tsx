import { Link } from 'react-router-dom';
import cl from './Sidebar.module.css';
import ReactStatIcon from '../../assets/images/statistic.svg?react';

const Sidebar = () => {
  return (
    <div className={cl.sidebar}>
      <div className={cl.sidebar__logo}>
        <Link to={'/'}>Home</Link>
      </div>
      <Link className={cl.sidebar__button} to={'connections'}>
        <ReactStatIcon className={cl.svgImage} /> <span>Connections</span>
      </Link>
      <Link className={cl.sidebar__button} to={'#'}>
        <ReactStatIcon className={cl.svgImage} /> <span>Statisic</span>
      </Link>
      <Link className={cl.sidebar__button} to={'#'}>
        <ReactStatIcon className={cl.svgImage} /> <span>Dashboard</span>
      </Link>
    </div>
  );
};

export default Sidebar;

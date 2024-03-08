import { Outlet } from 'react-router-dom';
import Sidebar from '../../components/Sidebar/Sidebar';
import cl from './MainLayout.module.css';

const MainLayout = () => {
  return (
    <div className={cl.wrapper}>
      <Sidebar />
      <Outlet />
    </div>
  );
};

export default MainLayout;

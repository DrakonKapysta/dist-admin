import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import MainLayout from './layouts/MainLayout/MainLayout';
import Home from './components/Home/Home';
import initializeSocket from './features/initalizeSocket';
import ConnectionsPage from './pages/Connections/ConnectionsPage';
import ConnectionIdPage from './pages/ConnectionIdPage/ConnectionIdPage';

const router = createBrowserRouter([
  {
    element: <MainLayout />,
    children: [
      { path: '/', element: <Home /> },
      { path: '/connections', element: <ConnectionsPage /> },
      { path: '/connections/:id', element: <ConnectionIdPage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);

initializeSocket();

// Remove Preload scripts loading
postMessage({ payload: 'removeLoading' }, '*');

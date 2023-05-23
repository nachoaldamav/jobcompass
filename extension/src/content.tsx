import React from 'react';
import ReactDOM from 'react-dom';
import {
  RouterProvider,
  createMemoryRouter,
  RouteObject,
  Outlet,
  createBrowserRouter,
  createHashRouter,
} from 'react-router-dom';
import Root from './views';
import { Toaster } from 'sonner';
import { ConfigPage } from './views/config';

const routes: RouteObject[] = [
  {
    path: '/',
    element: (
      <div className="bg-[#141521] w-96 h-full p-2 relative min-h-[24rem]">
        <div
          className="absolute bottom-0 right-0 opacity-30 homeGradientA homeGradientB"
          style={{
            width: '200px',
            height: '200px',
            borderRadius: '100%',
          }}
        />
        <Toaster theme="dark" />
        <Outlet />
      </div>
    ),
    children: [
      {
        path: '/',
        element: <Root />,
      },
      {
        path: '/config',
        element: <ConfigPage />,
      },
    ],
  },
];

const newNode = document.createElement('div');
document.body.appendChild(newNode);
ReactDOM.render(<RouterProvider router={createHashRouter(routes)} />, newNode);

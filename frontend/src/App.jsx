import { createBrowserRouter, Outlet, RouterProvider } from 'react-router-dom';

import './App.css';
import SingleRole from './SingleRole';
import RoleList, { loader as roleListLoader } from './RoleList';

const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <>
        <h2>App - CORS Test (CORS not active)</h2>
        <Outlet />
      </>
    ),
    children: [
      { path: 'roles', element: <RoleList />, loader: roleListLoader },
      {
        path: 'roles/:id',
        element: <SingleRole />,
      },
    ],
  },
  {
    path: '/cors',
    element: (
      <>
        <h2>App - CORS Test (CORS active)</h2>
        <Outlet />
      </>
    ),
    children: [
      { path: 'roles', element: <RoleList />, loader: roleListLoader },
      {
        path: 'roles/:id',
        element: <SingleRole />,
      },
    ],
  },
]);
function App() {
  return (
    <>
      <RouterProvider router={router} />
      {/* <div>App - CORS Test</div> */}
    </>
  );
}

export default App;

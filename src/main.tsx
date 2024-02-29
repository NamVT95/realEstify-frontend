import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import BookingManagement from './pages/dashboard/booking/page.tsx';
import HomePage from './pages/home/index.tsx';
import NotFound from './pages/notFound/index.tsx';
import ProfilePage from './pages/profile/index.tsx';
import ViewDetailsPage from './pages/viewDetails/index.tsx';
import { store } from './store/store.ts';
import DashboardLayout from './pages/dashboard/layout.tsx';
import LoginPage from './pages/authentication/login/page.tsx';
import Register from './pages/authentication/register/page.tsx';
import ProfileForm from './pages/profile/components/ProfileForm.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/detail/:id",
    element: <ViewDetailsPage />,
  },
  {
    path: "/profile",
    element: <ProfilePage />,
  },
  {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
      {
        path: "booking",
        element: <BookingManagement />,
      },
      {
        path: "project",
        element: <div>Project Management</div>,
      },
      {
        path: "user",
        element: <div>User Management</div>,
      },
      {
        path: "user",
        element: <div>User Management</div>,
      },
      {
        path: "setting",
        element: <ProfileForm />,
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

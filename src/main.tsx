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
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import AdminDashboardLayout from './pages/admin-dashboard/layout.tsx';
import Project from './pages/admin-dashboard/project/page.tsx';
import CustomerPage from './pages/admin-dashboard/customer/page.tsx';
import AgencyPage from './pages/admin-dashboard/agency/page.tsx';
import AgencyRoute from './route/agencyRoute.tsx';
import InvestorRoute from './route/investorRoute.tsx';
import CreateProjectPage from './pages/admin-dashboard/project/create/page.tsx';
import ProjectDetail from './pages/project-details/page.tsx';
import CreateCustomerPage from './pages/admin-dashboard/customer/page/CreateCustomerPage.tsx';
import UpdateCustomerPage from './pages/admin-dashboard/customer/page/UpdateCustomerPage.tsx';
import ViewBookingCustomer from './pages/admin-dashboard/customer/page/ViewBookingCustomer.tsx';

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
    element: (
      <AgencyRoute>
        <DashboardLayout />
      </AgencyRoute>
    ),
    children: [
      {
        path: "booking",
        element: <BookingManagement />,
      },
      {
        path: "setting",
        element: <ProfileForm />,
      },
    ],
  },
  {
    path: "/admin-dashboard",
    element:
      <AdminDashboardLayout />
    ,
    children: [
      {
        path: "project",
        element: <Project />,
      },
      {
        path: "project/create",
        element: <CreateProjectPage />,
      },
      {
        path: "customer",
        element: <CustomerPage />,
      },
      {
        path: "customer/create",
        element: <CreateCustomerPage />,
      },
      {
        path: "customer/:id",
        element: <UpdateCustomerPage />,
      },
      {
        path: "customer/:id/booking",
        element: <ViewBookingCustomer />,
      },
      {
        path: "booking",
        element: <BookingManagement />,
      },
      {
        path: "agency",
        element: <AgencyPage />,
      },
      {
        path: "setting",
        element: <ProfileForm />,
      },
      {
        path: "project/:id",
        element: <ProjectDetail />,
      }
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);

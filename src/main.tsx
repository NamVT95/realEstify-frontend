import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import AgencyPage from './pages/admin-dashboard/agency/page.tsx';
import CustomerPage from './pages/admin-dashboard/customer/page.tsx';
import UpdateCustomerPage from './pages/admin-dashboard/customer/page/UpdateCustomerPage.tsx';
import ViewBookingCustomer from './pages/admin-dashboard/customer/page/ViewBookingCustomer.tsx';
import ViewPayment from './pages/admin-dashboard/customer/page/ViewPayment.tsx';
import AdminDashboardLayout from './pages/admin-dashboard/layout.tsx';
import CreateProjectPage from './pages/admin-dashboard/project/create/page.tsx';
import Project from './pages/admin-dashboard/project/page.tsx';
import LoginPage from './pages/authentication/login/page.tsx';
import Register from './pages/authentication/register/page.tsx';
import BookingManagement from './pages/dashboard/booking/page.tsx';
import SelectPropertyForBooking from './pages/dashboard/booking/selectPropertyTable/page.tsx';
import DashboardLayout from './pages/dashboard/layout.tsx';
import HomePage from './pages/home/index.tsx';
import NotFound from './pages/notFound/index.tsx';
import ProfileForm from './pages/profile/components/ProfileForm.tsx';
import ProfilePage from './pages/profile/index.tsx';
import ProjectDetail from './pages/project-details/page.tsx';
import ViewDetailsPage from './pages/viewDetails/index.tsx';
import AgencyRoute from './route/agencyRoute.tsx';
import { store } from './store/store.ts';
import CreateCustomerPage from './pages/admin-dashboard/customer/page/CreateCustomerPage.tsx';
import CreateAgencyPage from './pages/admin-dashboard/agency/components/CreateAgencyPage.tsx';
import UpdateAgencyPage from './pages/admin-dashboard/agency/components/UpdateAgencyPage.tsx';
import ViewProfilePage from './pages/profile/viewProfile.tsx';
import BookingHistory from './pages/profile/BookingHistory.tsx';
import { PaymentMethodPage } from './pages/admin-dashboard/project/PaymentMethodPage.tsx';
import PaymentMethodDetailPage from './pages/admin-dashboard/project/PaymentMethodDetailPage.tsx';
import CreatePaymentMethod from './pages/admin-dashboard/project/CreatePaymentMethod.tsx';
import ViewPaymentTable from './pages/admin-dashboard/project/ViewPaymentTable.tsx';
import AboutPage from './pages/about/index.tsx';
import ContactPage from './pages/contact/page.tsx';

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
    path: "/about",
    element: <AboutPage />,
  },
  {
    path: "/contact",
    element: <ContactPage />,
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
    element: <ViewProfilePage />,
  },
  {
    path: "/profile/update",
    element: <ProfilePage />,
  },
  {
    path: "/booking-history",
    element: <BookingHistory />,
  },
  {
    path: "/dashboard",
    element: (
      // <AgencyRoute>
        <DashboardLayout />
      // </AgencyRoute>
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
      {
        path: "booking/select-property/:slug",
        element: <SelectPropertyForBooking />,
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
        path: "agency/create",
        element: <CreateAgencyPage />,
      },
      {
        path: "agency/:id",
        element: <UpdateAgencyPage />,
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
        path: "customer/:id/booking/:bookingId/payment",
        element: <ViewPayment />,
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
      },
      {
        path: "project/:id/payment-method",
        element: <PaymentMethodPage />,
      },
      {
        path: "project/:id/payment-method/create",
        element: <CreatePaymentMethod />,
      },
      {
        path: "project/:id/payment-method/:payId",
        element: <ViewPaymentTable />,
      },
      {
        path: "project/:id/payment-method/:payId/update",
        element: <PaymentMethodDetailPage />,
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

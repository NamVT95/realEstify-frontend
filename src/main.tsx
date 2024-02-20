import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import './index.css';
import HomePage from './pages/home/index.tsx';
import { store } from './store/store.ts';
import ViewDetailsPage from './pages/viewDetails/index.tsx';
import NotFound from './pages/notFound/index.tsx';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/detail/:id",
    element: <ViewDetailsPage />,
  },
  {
    path: "*",
    element: <NotFound />,
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>,
)

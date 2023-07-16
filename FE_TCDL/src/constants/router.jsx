import { createBrowserRouter } from 'react-router-dom';
import HomePage from '../container/HomePage';
import MedicinePage from '../container/MedicinePage';
import AdminPage from '../container/AdminPage';
import CreateMedicine from '../container/AdminPage/CreateMedicine';
import AboutPage from '../container/AboutPage';
import ContactPage from '../container/ContactPage';
import ErrorPage from '../container/ErrorPage';

const router = createBrowserRouter([
  { path: '/', element: <HomePage /> },
  { path: '/about', element: <ErrorPage /> },
  { path: '/contact', element: <ErrorPage /> },
  { path: '/medicine/:slug', element: <MedicinePage /> },
  { path: '/admin', element: <AdminPage /> },
  { path: '/admin/create', element: <CreateMedicine /> },
  { path: '*', element: <ErrorPage /> },
]);

export default router;

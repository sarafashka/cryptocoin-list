import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import MainPage from '../../pages/MainPage/MainPage';
import ReactHookFormPage from '../../pages/ReactHookFormPage/ReactHookFormPage';
import Error404 from '../../pages/Error404/Error404';
import UncontrolledFormPage from '../../pages/UncontrolledFormPage/UncontrolledFormPage';

const App = () => {
  const router = createBrowserRouter([
    {
      path: `/`,
      element: <MainPage />,
      errorElement: <Error404 />,
    },
    {
      path: `/uncontrolled`,
      element: <UncontrolledFormPage />,
    },
    {
      path: `/react-hook-form`,
      element: <ReactHookFormPage />,
    },
  ]);
  return <RouterProvider router={router} />;
};

export default App;

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CoinsPage from '../../pages/CoinsPage';
import Error404 from '../../pages/Error404/Error404';
import CoinCard from '../CoinCard';
import AppRoutes from '../../constants/routes';

const App = () => {
  const router = createBrowserRouter([
    {
      path: `${AppRoutes.HOME}`,
      element: <CoinsPage />,
      errorElement: <Error404 />,
      children: [
        {
          path: `${AppRoutes.COIN}`,
          element: <CoinCard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;

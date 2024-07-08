import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import CoinsPage from '../../pages/CoinsPage';
import Error404 from '../../pages/Error404/Error404';
import CoinCard from '../CoinCard';

const App = () => {
  const router = createBrowserRouter([
    {
      path: '/',
      element: <CoinsPage />,
      errorElement: <Error404 />,
      children: [
        {
          path: 'coins/:coinId',
          element: <CoinCard />,
        },
      ],
    },
  ]);
  return <RouterProvider router={router} />;
};
export default App;

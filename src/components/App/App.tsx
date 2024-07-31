import { Provider } from 'react-redux';
import { ThemeProvider } from '../../context/ThemeProvider';
import { store } from '../../store';
import ErrorBoundary from '../ErrorBoundary';
import CoinsPage from '../../pages/CoinsPage/CoinsPage';

const App = () => {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <CoinsPage />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
};

export default App;

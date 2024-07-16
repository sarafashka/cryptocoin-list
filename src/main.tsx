import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/index.tsx';
import { Provider } from 'react-redux';
import { store } from './redux';
import './index.scss';
import ErrorBoundary from './components/ErrorBoundary/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <Provider store={store}>
        <App />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);

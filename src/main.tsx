import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App/index.tsx';
import './index.scss';
import ErrorBoundary from './components/ErrorBoundary/index.tsx';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);

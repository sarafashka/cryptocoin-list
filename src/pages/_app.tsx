import { Provider } from 'react-redux';
import ErrorBoundary from '../components/ErrorBoundary';
import '../global.scss';
import type { AppProps } from 'next/app';
import { store } from '../store';
import { ThemeProvider } from '../context/ThemeProvider';
import React from 'react';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ErrorBoundary>
      <ThemeProvider>
        <Provider store={store}>
          <Component {...pageProps} />
        </Provider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

import { Provider } from 'react-redux';
import ErrorBoundary from '../src/components/ErrorBoundary';
import '../global.scss';
import type { AppProps } from 'next/app';
import { store } from '../src/store';
import { ThemeProvider } from '../src/context/ThemeProvider';
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

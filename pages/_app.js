import { ChakraProvider } from '@chakra-ui/react';
import theme from '../theme';
import '../index.css'
import ErrorBoundary from '../components/ErrorBoundary';
import { useEffect } from 'react';

export default function MyApp({ Component, pageProps }) {
  useEffect(() => {
    // Global error handler for unhandled promise rejections and runtime errors
    const handleError = (event) => {
      const errorData = {
        message: event.error?.message || event.reason?.message || 'Unknown error',
        stack: event.error?.stack || event.reason?.stack || 'No stack trace',
        timestamp: new Date().toISOString(),
        userAgent: window.navigator.userAgent,
        url: window.location.href,
        type: event.type,
      };

      console.error('Unhandled error:', errorData);

      // Log to server
      fetch('/api/log-error', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(errorData),
      }).catch(err => console.error('Failed to log error:', err));
    };

    // Handle unhandled promise rejections
    window.addEventListener('unhandledrejection', handleError);
    // Handle uncaught errors
    window.addEventListener('error', handleError);

    return () => {
      window.removeEventListener('unhandledrejection', handleError);
      window.removeEventListener('error', handleError);
    };
  }, []);

  return (
    <ErrorBoundary>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ErrorBoundary>
  )
}

import React from 'react';
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

const logErrorToServer = (error, errorInfo) => {
  const errorReport = {
    message: error.message,
    stack: error.stack,
    componentStack: errorInfo.componentStack,
    timestamp: new Date().toISOString(),
    userAgent: typeof window !== 'undefined' ? window.navigator.userAgent : 'Unknown',
    url: typeof window !== 'undefined' ? window.location.href : 'Unknown',
  };

  // Log to console for immediate debugging
  console.error('ErrorBoundary caught an error:', errorReport);

  // Send to server for logging (this will appear in Vercel logs)
  if (typeof window !== 'undefined') {
    fetch('/api/log-error', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(errorReport),
    }).catch(logError => {
      console.error('Failed to log error to server:', logError);
    });
  }
};

const ErrorFallback = ({ error, resetErrorBoundary }) => {
  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <VStack spacing={6} textAlign="center" maxW="600px">
        <Heading size="lg" color="red.500">
          Something went wrong
        </Heading>
        <Text color="gray.600">
          We're sorry, but there was an error loading this page. The error has been logged and we'll investigate.
        </Text>
        
        {process.env.NODE_ENV === 'development' && error && (
          <Box
            bg="red.50"
            border="1px solid"
            borderColor="red.200"
            borderRadius="md"
            p={4}
            textAlign="left"
            fontSize="sm"
            fontFamily="mono"
            maxW="100%"
            overflow="auto"
          >
            <Text fontWeight="bold" color="red.700" mb={2}>
              Error Details (Development Only):
            </Text>
            <Text color="red.600" mb={2}>
              {error.message}
            </Text>
            <Text color="red.500" fontSize="xs" whiteSpace="pre-wrap">
              {error.stack}
            </Text>
          </Box>
        )}

        <VStack spacing={3}>
          <Button colorScheme="blue" onClick={resetErrorBoundary}>
            Try Again
          </Button>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Reload Page
          </Button>
        </VStack>
      </VStack>
    </Box>
  );
};

const ErrorBoundary = ({ children }) => {
  return (
    <ReactErrorBoundary
      FallbackComponent={ErrorFallback}
      onError={logErrorToServer}
      onReset={() => {
        // Optional: Clear any error state or refresh data
        window.location.hash = '';
      }}
    >
      {children}
    </ReactErrorBoundary>
  );
};

export default ErrorBoundary;
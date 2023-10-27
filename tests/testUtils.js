import { GlobalProvider } from 'context/GlobalContext';
import { SocketContext, socket } from 'context/SocketContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { jest } from '@jest/globals';
import { useRouter } from 'next/router';
import InitCheck from 'components/InitCheck';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity,
    },
  },
});

useRouter.mockImplementation(() => ({
  push: jest.fn(),
  replace: jest.fn(),
  prefetch: jest.fn(),
}));

function TestWrapperComponent({ children }) {
  return (
    <SocketContext.Provider value={socket}>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <InitCheck>{children}</InitCheck>
        </GlobalProvider>
      </QueryClientProvider>
    </SocketContext.Provider>
  );
}

export default TestWrapperComponent;

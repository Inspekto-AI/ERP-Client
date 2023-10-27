import { GlobalProvider } from 'context/GlobalContext';
import { SocketContext, socket } from 'context/SocketContext';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
});

const mock = new MockAdapter(axios);
mock.onGet('/api/some-endpoint').reply(200, { data: 'Mocked Data' });

function TestWrapperComponent({ children }) {
  return (
    <SocketContext.Provider value={socket}>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>{children}</GlobalProvider>
      </QueryClientProvider>
    </SocketContext.Provider>
  );
}

export default TestWrapperComponent;

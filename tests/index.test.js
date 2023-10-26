/* eslint-disable import/no-extraneous-dependencies */
import { queryByTestId, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { expect, jest, test } from '@jest/globals';
import { GlobalProvider } from 'context/GlobalContext';
import { SocketContext, socket } from 'context/SocketContext';
import Index from '../pages/index';
// import { RouterContext } from 'next/dist/next-server/lib/router-context';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: Infinity
    }
  }
});

// Mocked router context
// const router = {
//   route: '/',
//   query: {},
//   asPath: '/',
//   push: () => {},
//   replace: () => {},
//   reload: () => {},
//   back: () => {},
//   prefetch: () => {},
//   beforePopState: () => {}
// };

// const routerWrapper = ({ children }) => (
//   <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
// );

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

test('renders my component', () => {
  render(
    // <RouterContext.Provider value={router}>
    <SocketContext.Provider value={socket}>
      <QueryClientProvider client={queryClient}>
        <GlobalProvider>
          <Index />
        </GlobalProvider>
      </QueryClientProvider>
    </SocketContext.Provider>
    // </RouterContext.Provider>
  );
  expect(screen.queryByTestId('trackbar')).toBeTruthy();
});

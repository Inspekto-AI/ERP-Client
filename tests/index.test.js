/* eslint-disable import/no-extraneous-dependencies */
import { queryByTestId, render, screen } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import React from 'react';
import { expect, jest, test } from '@jest/globals';

import Index from '../pages/index';
import TestWrapperComponent from './testUtils';

jest.mock('next/router', () => ({
  useRouter: jest.fn()
}));

test('renders my component', () => {
  render(
    <TestWrapperComponent>
      <Index />
    </TestWrapperComponent>
  );
  expect(screen.queryByTestId('664TLM-1')).toBeTruthy();
});

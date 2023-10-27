/* eslint-disable import/no-extraneous-dependencies */
import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { expect, jest, test } from '@jest/globals';
import axios from './apiMock';
import Index from '../pages/index';
import TestWrapperComponent from './testUtils';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

test('renders my component', async () => {
  render(
    <TestWrapperComponent>
      <Index />
    </TestWrapperComponent>,
  );
  await waitFor(() => {
    console.log('waiting');
    expect(screen.queryByTestId('testVehicleBelt')).toBeTruthy();
  });
  expect(screen.queryByTestId('testVehicleBelt')).toBeTruthy();
});

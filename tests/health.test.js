/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { afterAll, beforeAll, expect, jest, test } from '@jest/globals';
import { Server } from 'socket.io';
import { createServer } from 'http';
import axios from './apiMock';
import Index from '../pages/index';
import TestWrapperComponent from './testUtils';
import { createMockSocketServer } from './socketServer';
import { act } from 'react-dom/test-utils';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

test('health page check', async () => {
  render(
    <TestWrapperComponent>
      <Index />
    </TestWrapperComponent>,
  );
  await waitFor(() => {
    expect(screen.queryByTestId('health_button')).toBeTruthy();
  });
  act(() => {
    const healthButton = screen.getByTestId('health_button');
    fireEvent.click(healthButton);
  });
  await waitFor(() => {
    expect(screen.queryByText('System Health Monitoring')).toBeTruthy();
  });
  await waitFor(() => {
    expect(screen.queryByText('Not Functioning')).toBeTruthy();
  });
  expect(screen.queryByTestId('Camera-2-true')).toBeTruthy();
  expect(screen.queryAllByTestId('Camera-1-false')).toBeTruthy();
});

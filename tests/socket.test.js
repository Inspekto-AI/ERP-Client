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
// import { server, startTestServer, stopTestServer } from './socketServer';

// Create a mock socket connection
// const mockSocket = io('http://localhost:3000');
// Emit or listen for mock socket events as needed

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

let mockServer;
let events = [
  {
    event: 'bag-congestion-frontend',
    message: {
      belt_id: 'testVehicleBelt',
      issue_with_belt: 'congestion',
      error: null,
    },
  },
];

test('alert socket event', async () => {
  mockServer = createServer();
  mockServer.listen(5000);
  await act(async () => {
    const promise = createMockSocketServer(mockServer, events);
    render(
      <TestWrapperComponent>
        <Index />
      </TestWrapperComponent>,
    );
    console.log(await promise);
  });

  await waitFor(() => {
    expect(screen.queryByTestId('testVehicleBelt')).toBeTruthy();
  });
  await waitFor(() => {
    expect(screen.queryByTestId('beltDetail-testVehicleBelt-congestion')).toBeTruthy();
  });
  expect(screen.queryByTestId('beltDetail-testVehicleBelt-congestion')).toBeTruthy();
});

afterAll(() => {
  try {
    mockServer.close();
  } catch (e) {
    console.log(e);
  }
});

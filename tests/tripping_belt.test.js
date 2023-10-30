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

let mockServer;
let events = [
  {
    event: 'tripping_belt',
    message: {
      belt_id: 'testPrintingBelt',
      issue_with_belt: 'some_error',
      error: null,
    },
  },
];

test('tripping belt event', async () => {
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
  const printBeltButton = screen.getByTestId('printing_belt');
  fireEvent.click(printBeltButton);
  await waitFor(() => {
    expect(screen.queryByText('testPrintingBelt')).toBeTruthy();
  });
  expect(screen.queryByTestId('openView-testPrintingBelt-some_error')).toBeTruthy();
});

afterAll(() => {
  try {
    mockServer.close();
  } catch (e) {
    console.log(e);
  }
});

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
  act(() => {
    const printBeltButton = screen.getByTestId('printing_belt');
    fireEvent.click(printBeltButton);
  });
  await waitFor(() => {
    expect(screen.queryByText('testPrintingBelt')).toBeTruthy();
  });
  act(() => {
    const openViewButton = screen.getByTestId('openView-testPrintingBelt-some_error');
    fireEvent.click(openViewButton);
  });
  await waitFor(() => {
    expect(screen.queryByTestId('defectiveBags-testPrintingBelt')).toBeTruthy();
  });
  act(() => {
    const modalCloseButton = screen.getByTestId('modal-close');
    fireEvent.click(modalCloseButton);
  });
  await waitFor(() => {
    expect(screen.queryByTestId('beltReset-testPrintingBelt')).toBeTruthy();
  });
  act(() => {
    const beltResetButton = screen.getByTestId('beltReset-testPrintingBelt');
    fireEvent.click(beltResetButton);
  });
  await waitFor(() => {
    expect(screen.queryByTestId('beltReset-testPrintingBelt')).toBeFalsy();
  });
  expect(screen.queryByTestId('beltReset-testPrintingBelt')).toBeFalsy();
});

afterAll(async () => {
  try {
    await mockServer.close();
  } catch (e) {
    console.log(e);
  }
});

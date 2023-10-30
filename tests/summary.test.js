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

// let mockServer;
// let events = [
//   {
//     event: 'tripping_belt',
//     message: {
//       belt_id: 'testPrintingBelt',
//       issue_with_belt: 'some_error',
//       error: null,
//     },
//   },
// ];

test('summary page check', async () => {
  //   mockServer = createServer();
  //   mockServer.listen(5000);
  //   await act(async () => {
  //     const promise = createMockSocketServer(mockServer, events);
  render(
    <TestWrapperComponent>
      <Index />
    </TestWrapperComponent>,
  );
  //     console.log(await promise);
  //   });
  await waitFor(() => {
    expect(screen.queryByTestId('summary_button')).toBeTruthy();
  });
  const printBeltButton = screen.getByTestId('summary_button');
  fireEvent.click(printBeltButton);
  await waitFor(() => {
    expect(screen.queryByText('testPrintingBelt')).toBeTruthy();
  });
  const beltSelect = screen.getByTestId('filter_select');
  console.log(beltSelect);
  act(() => {
    fireEvent.change(beltSelect, { target: { value: 1 } });
  });
  await waitFor(() => {
    expect(screen.queryByText('Loader Summary')).toBeTruthy();
  });
  expect(screen.queryByText('testVehicleBelt')).toBeTruthy();
});

// afterAll(async () => {
//   try {
//     await mockServer.close();
//   } catch (e) {
//     console.log(e);
//   }
// });

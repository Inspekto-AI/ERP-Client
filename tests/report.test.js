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

test('report page check', async () => {
  render(
    <TestWrapperComponent>
      <Index />
    </TestWrapperComponent>,
  );
  await waitFor(() => {
    expect(screen.queryByTestId('report_button')).toBeTruthy();
  });
  const reportButton = screen.getByTestId('report_button');
  fireEvent.click(reportButton);
  await waitFor(() => {
    expect(screen.queryAllByTestId('printing_belt_row-testPrintingBelt')).toBeTruthy();
    expect(screen.queryByTestId('loading_row-testVehicleBelt')).toBeTruthy();
    expect(screen.queryByTestId('shipment_row-1')).toBeTruthy();
    expect(screen.queryByTestId('shipment_row-2')).toBeTruthy();
  });
});

// afterAll(async () => {
//   try {
//     await mockServer.close();
//   } catch (e) {
//     console.log(e);
//   }
// });

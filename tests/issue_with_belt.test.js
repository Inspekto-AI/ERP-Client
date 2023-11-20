/* eslint-disable import/no-extraneous-dependencies */
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { afterAll, beforeAll, expect, jest, test } from '@jest/globals';
import { Server } from 'socket.io';
import { createServer } from 'http';
import axios from './apiMock';
import Index from '../pages/index';
import TestWrapperComponent from './testUtils';
import { createMockSocketServer, emitEvents } from './socketServer';
import { act } from 'react-dom/test-utils';
// import { server, startTestServer, stopTestServer } from './socketServer';

// Create a mock socket connection
// const mockSocket = io('http://localhost:3000');
// Emit or listen for mock socket events as needed

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));

let mockServer;
let mockIo;

let event1 = [
  {
    event: 'service',
    message: {
      bag_count: 0,
      bag_count_finished_at: null,
      bag_count_limit: 324,
      bag_counting_belt_id: 'testVehicleBelt',
      bag_limit: 324,
      bag_type: 'PPC_NFR',
      camera_info: null,
      created_at: 1698759870738,
      error: null,
      gate_no: 'default',
      id: 12868,
      is_active: 1,
      is_listed: 1,
      label_example: '',
      licence_number: '4',
      missed_label_count: 0,
      printing_belt_id: null,
      printing_id: null,
      rack_no: null,
      server_index: 0,
      state: 0,
      stopped_at: null,
      tag_count: 0,
      tag_count_finished_at: null,
      transaction_id: 12868,
      vehicle_id: 'testVehicleBelt',
      vehicle_type: 0,
      wagon_no: '',
    },
  },
];

let event2 = [
  {
    event: 'bag-congestion-frontend',
    message: {
      id: 'testVehicleBelt',
      belt_id: 'testVehicleBelt',
      issue_with_belt: 'congestion',
      error: null,
    },
  },
];

test('belt congestion frontend event', async () => {
  mockServer = createServer();
  mockServer.listen(5000);
  await act(async () => {
    const promise = createMockSocketServer(mockServer, []);
    render(
      <TestWrapperComponent>
        <Index />
      </TestWrapperComponent>,
    );
    mockIo = await promise;
  });
  await waitFor(() => {
    expect(screen.queryByTestId('testVehicleBelt')).toBeTruthy();
  });
  // act(() => {
  //   const gradeSelect = screen.getByTestId('grade-testVehicleBelt');
  //   fireEvent.change(gradeSelect, { target: { value: 'PPC_Suraksha' } });
  //   const trunckInput = screen.getByTestId('wagon-testVehicleBelt');
  //   fireEvent.change(trunckInput, { target: { value: 123 } });
  //   const targetInput = screen.getByTestId('target-testVehicleBelt');
  //   fireEvent.change(targetInput, { target: { value: 123 } });
  // });
  // console.log(screen.getByTestId('start-testVehicleBelt').disabled);
  // await waitFor(() => {
  //   expect(screen.getByTestId('start-testVehicleBelt').disabled).toBeFalsy();
  // });
  // act(() => {
  //   const startButton = screen.getByTestId('start-testVehicleBelt');
  //   fireEvent.click(startButton);
  // });
  await act(async () => {
    await emitEvents(mockIo, event1);
  });

  await act(async () => {
    await emitEvents(mockIo, event2);
  });
  console.log(screen.getByTestId('beltDetail-testVehicleBelt-congestion'));
  await waitFor(() => {
    expect(screen.getByTestId('beltDetail-testVehicleBelt-congestion').disabled).toBeFalsy();
  });
  const viewButton = screen.getByTestId('beltDetail-testVehicleBelt-congestion');
  act(() => {
    fireEvent.click(viewButton);
  });
  await waitFor(() => {
    expect(screen.queryByTestId('congestion-testVehicleBelt')).toBeTruthy();
  });
});

afterAll(async () => {
  try {
    await mockServer.close();
  } catch (e) {
    console.log(e);
  }
});

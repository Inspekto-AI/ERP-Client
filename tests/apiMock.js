/* eslint-disable import/no-extraneous-dependencies */
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';

const mock = new MockAdapter(axios);
mock.onGet('/api/configuration/initialize-frontend').reply(
  200,
  {
    data: {
      organization_id: 1,
      score_threshold_bag_wagon: 0.7,
      score_threshold_bag: 0.7,
      score_threshold_tag: 0.1,
      iou_threshold_bag: 0.3,
      iou_threshold_tag: 0.3,
      iou_threshold_bag_wagon: 0.7,
      img_compression: 100,
      bag_types:
        'PPC_Suraksha,PPC_ACC_NFR,Power_Plus,Ambuja_NFR,Ambuja_Plus,Ambuja_Yellow,ACC_Gold,Ambuja_Kawach',
      deactivate_loader_solution: 0,
      deactivate_printing_solution: 0,
      enable_loader_plc: 1,
      enable_printing_plc: 0,
      enable_misprint_plc: 1,
      misprint_alert_limit: 5,
      relay_belt_running: 0,
      relay_belt_stopped: 1,
      enable_hooter: 0,
      hooter_timeout: 10000,
      enable_online_reports: 1,
      number_of_slaves: 1,
      number_of_shipments_allowed: 8,
      congestion_threshold: 10,
      enable_loader_display: 1,
      number_of_whatsapp_recipient: 4,
      is_plc: 1,
    },
  },
  { authorization: 'test' },
);

mock.onGet('/api/users/check/auth').reply(200, {}, { authorization: 'test' });

mock.onGet('/api/init').reply(200, { data: false }, { authorization: 'test' });

mock.onGet('/api/shipment').reply(
  200,
  {
    data: {
      printingBeltRes: {
        testPrintingBelt: {
          id: 'testPrintingBelt',
          printing_id: 'testPrintingBelt',
          tag_count: 0,
          missed_label_count: 0,
          is_belt_running: true,
        },
      },
      vehicleBeltRes: {
        testVehicleBelt: {
          id: 'testVehicleBelt',
          vehicle_id: 'testVehicleBelt',
          vehicle_type: 0,
          is_active: 1,
          bag_type: 1,
        },
      },
      enableBeltTripping: 1,
      showLoader: 0,
      showPrinting: 0,
      truckLoaders: 1,
      wagonLoaders: 1,
    },
  },
  { authorization: 'test' },
);

mock.onGet('/api/shipment/rack-status').reply(
  200,
  {
    data: { rackStatus: null, rackNo: null },
  },
  { authorization: 'test' },
);

mock.onGet('/api/stats/summarized-stats').reply(
  200,
  {
    data: {
      analysis: {
        total_bags_dispatched: 0,
        total_bags_packed: 0,
        total_missed_labels: 0,
        total_burstage_count: 0,
        missed_paths: {
          testPrintingBelt: [],
        },
        loaderBags: {
          testVehicleBelt: 0,
        },
        packerBags: {
          testPrintingBelt: 0,
        },
        burstageCount: 0,
        HourlyPackerBags: [
          {
            name: '12 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '1 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '2 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '3 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '4 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '5 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '6 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '7 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
        ],
        HourlyLoaderBags: [
          {
            name: '12 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '1 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '2 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '3 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '4 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '5 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '6 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
          {
            name: '7 AM',
            Dispatch: 0,
            Efficiency: 0,
          },
        ],
        packerWiseHourlyData: {
          0: {
            testPrintingBelt: 0,
          },
          1: {
            testPrintingBelt: 0,
          },
          2: {
            testPrintingBelt: 0,
          },
          3: {
            testPrintingBelt: 0,
          },
          4: {
            testPrintingBelt: 0,
          },
          5: {
            testPrintingBelt: 0,
          },
          6: {
            testPrintingBelt: 0,
          },
          7: {
            testPrintingBelt: 0,
          },
        },
        missedPackerBags: {
          testPrintingBelt: 0,
        },
        packerWiseHourlyMissedBags: {
          0: {
            testPrintingBelt: 0,
          },
          1: {
            testPrintingBelt: 0,
          },
          2: {
            testPrintingBelt: 0,
          },
          3: {
            testPrintingBelt: 0,
          },
          4: {
            testPrintingBelt: 0,
          },
          5: {
            testPrintingBelt: 0,
          },
          6: {
            testPrintingBelt: 0,
          },
          7: {
            testPrintingBelt: 0,
          },
        },
        targetLoaderCount: 0,
        shipmentDetails: [],
        vehicleType: {
          testVehicleBelt: 0,
          testPrintingBelt: 0,
        },
      },
      shift: 1,
      date: '10/30/2023',
      maintainence_tickets: [],
    },
  },
  { authorization: 'test' },
);

mock.onPut('/api/shipment/reset-belt').reply(200, { data: null }, { authorization: 'test' });

export default axios;

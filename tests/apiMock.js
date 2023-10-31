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

const filter1ShipmentData = {
  shipment_id: 1,
  aws_upload_status: 0,
  printing_belt_id: 'testPrintingBelt',
  loading_belt_id: 'testVehicleBelt',
  wagon_no: 'W123',
  rack_no: 'R456',
  gate_no: 'G789',
  licence_number: 'LIC123',
  bag_type: 'TypeA',
  bag_limit: 100,
  label_example: 'ExampleLabel',
  is_active: 1,
  stopped_at: 1635583922,
  is_listed: 1,
  last_count_at: 1635584000,
  loading_count: 500,
  printing_count: 1000,
  misprinting_count: 10,
  date_created: '2023-10-30',
  hour_created: 14,
  state: 1,
  add_comment: 'This is an additional comment',
  stop_comment: 'This is a stop comment',
  bags_increased: 50,
  organization_id: 2,
  created_at: 1635584100,
};

const filter2ShipmentData = {
  shipment_id: 2,
  aws_upload_status: 0,
  printing_belt_id: 'testPrintingBelt2',
  loading_belt_id: 'testVehicleBelt2',
  wagon_no: 'W123',
  rack_no: 'R456',
  gate_no: 'G789',
  licence_number: 'LIC123',
  bag_type: 'TypeA',
  bag_limit: 100,
  label_example: 'ExampleLabel',
  is_active: 1,
  stopped_at: 1635583922,
  is_listed: 1,
  last_count_at: 1635584000,
  loading_count: 500,
  printing_count: 1000,
  misprinting_count: 10,
  date_created: '2023-10-30',
  hour_created: 14,
  state: 1,
  add_comment: 'This is an additional comment',
  stop_comment: 'This is a stop comment',
  bags_increased: 50,
  organization_id: 2,
  created_at: 1635584100,
};

mock.onGet('/api/stats/shipment-stats').reply((config) => {
  const paramValue = config.params.shipmentFilter;
  return paramValue
    ? [200, { data: { count: 1, rows: [filter1ShipmentData] } }, { authorization: 'test' }]
    : [200, { data: { count: 1, rows: [filter2ShipmentData] } }, { authorization: 'test' }];
});

mock.onGet('/api/stats/printing-stats').reply(
  200,
  {
    data: [
      [
        {
          shipment_count: 0,
          tag_count: 0,
          belt_id: 'testPrintingBelt',
          missed_label_count: 0,
        },
      ],
      [
        {
          shipment_count: 0,
          tag_count: 0,
          belt_id: 'testPrintingBelt',
          missed_label_count: 0,
        },
      ],
      [
        {
          shipment_count: 0,
          tag_count: 0,
          belt_id: 'testPrintingBelt',
          missed_label_count: 0,
        },
      ],
    ],
  },
  { authorization: 'test' },
);

mock.onGet('/api/stats/loading-stats').reply(
  200,
  {
    data: [
      {
        shipment_count: 0,
        bag_count: 0,
        belt_id: 'testVehicleBelt',
        vehicle_type: 1,
      },
    ],
  },
  { authorization: 'test' },
);

mock.onGet('/api/stats/inoperational-device-stats').reply(
  200,
  {
    data: {
      Arduino: [],
      Plc: [],
      Receivers: [],
      Transmitters: [],
      NVR: [],
      Camera: [
        {
          id: 1,
          entity_type: 'Camera',
          entity_name: 'CamA',
          ip_address: '0.0.0.1',
          get_status: 0,
          parent_id: 3,
          started_at: 123123,
          ended_at: null,
        },
        {
          id: 2,
          entity_type: 'Camera',
          entity_name: 'CamB',
          ip_address: '0.0.0.2',
          get_status: 1,
          parent_id: 3,
          started_at: null,
          ended_at: null,
        },
      ],
    },
  },
  { authorization: 'test' },
);

mock.onPut('/api/shipment/reset-belt').reply(200, { data: null }, { authorization: 'test' });

export default axios;

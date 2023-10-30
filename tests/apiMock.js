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

mock.onPut('/api/shipment/reset-belt').reply(200, { data: null }, { authorization: 'test' });

export default axios;

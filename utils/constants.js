export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
export const PACKER_LIMIT = parseInt(process.env.NEXT_PUBLIC_PACKER_LIMIT, 10);
export const BAG_TYPES = [
  'ACC Suraksha',
  'ACC Gold',
  'ACC Power',
  'ACC NFR',
  'Ambuja Plus',
  'Ambuja Star',
  'Ambuja NFR'
];
export const IS_AWS_FRONTEND = process.env.NEXT_PUBLIC_IS_AWS_FRONTEND === '1';

export const CLIENT_NAME = process.env.NEXT_PUBLIC_CLIENT_NAME;

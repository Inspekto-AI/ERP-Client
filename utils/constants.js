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
export const FIRST_SHIFT = [
  process.env.NEXT_PUBLIC_PLANT_START,
  process.env.NEXT_PUBLIC_FIRST_SHIFT
];
export const SECOND_SHIFT = [
  process.env.NEXT_PUBLIC_FIRST_SHIFT + 1,
  process.env.NEXT_PUBLIC_SECOND_SHIFT
];
export const THIRD_SHIFT = [
  process.env.NEXT_PUBLIC_SECOND_SHIFT + 1,
  process.env.NEXT_PUBLIC_THIRD_SHIFT
];
export const CLIENT_NAME = process.env.NEXT_PUBLIC_CLIENT_NAME;

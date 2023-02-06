export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || '';
export const PACKER_LIMIT = parseInt(process.env.NEXT_PUBLIC_PACKER_LIMIT, 10);
export const IS_AWS_FRONTEND = process.env.NEXT_PUBLIC_IS_AWS_FRONTEND === '1';
export const CLIENT_NAME = process.env.NEXT_PUBLIC_CLIENT_NAME;
export const BAG_TYPES = process.env.NEXT_PUBLIC_BAG_TYPES_LIST.split(' ');
export const SYSTEM_REFETCH_TIMEOUT_MS = parseInt(
  process.env.NEXT_PUBLIC_SYSTEM_REFETCH_TIMEOUT_MS,
  10
);
export const DEACTIVATE_LOADER_SOLUTION =
  process.env.NEXT_PUBLIC_DEACTIVATE_LOADER_SOLUTION === '1';
export const DEACTIVATE_PRINTING_SOLUTION = process.env.NEXT_PUBLIC_DEACTIVATE_PRINTING_SOLUTION==='1';
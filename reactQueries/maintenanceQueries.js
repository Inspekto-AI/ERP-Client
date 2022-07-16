import { post } from 'utils/api';
import { useMutation } from 'react-query';

export const MaintenanceQuery = () => {
  return useMutation(values =>
    post('/api/transaction/maintenance', values).then(res => res.data)
  );
};

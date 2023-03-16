import { post } from 'utils/api';
import { useMutation } from 'react-query';

export const ServiceQuery = () => {
  return useMutation(values =>
    post('/api/shipment', values).then(res => res.data)
  );
};

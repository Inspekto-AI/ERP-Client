import { post } from 'utils/api';
import { useMutation } from 'react-query';

const ServiceQuery = () => {
  const mutation = useMutation((values) => post('/api/shipment', values).then((res) => res.data));

  return mutation;
};

export default ServiceQuery;

import { post } from 'utils/api';
import { useMutation } from 'react-query';

const ServiceQuery = () => useMutation((values) => post('/api/shipment', values).then((res) => res.data));

export default ServiceQuery;

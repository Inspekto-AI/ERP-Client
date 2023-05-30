import { post } from 'utils/api';
import { useMutation } from 'react-query';

const MaintenanceQuery = () => useMutation((values) => post('/api/maintenance', values).then((res) => res.data));

export default MaintenanceQuery;

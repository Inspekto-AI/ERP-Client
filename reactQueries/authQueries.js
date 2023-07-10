import { useQuery, useMutation } from 'react-query';
import { get, post } from 'utils/api';

export const fetchCheckAuth = async () => {
  const res = await get('/api/users/check/auth');
  return res.data;
};

export const CheckAuth = () => useQuery('checkAuth', () => fetchCheckAuth());

export const LoginQuery = () => useMutation((values) => post('/api/users/login', values).then((res) => res.data));

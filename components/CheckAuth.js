import { useContext, useEffect } from 'react';
import { CheckAuth as CheckAuthMutation } from 'reactQueries/authQueries';
import PropTypes from 'prop-types';
import { GlobalContext } from 'context/GlobalContext';
import Loader from 'components/Loader';

const CheckAuth = ({ children }) => {
  const { userData, setUserData } = useContext(GlobalContext);
  const { data, isSuccess, isError } = CheckAuthMutation();

  useEffect(() => {
    if (isSuccess) {
      if (data && data.success) {
        setUserData({ ...data.data, isLoggedIn: true });
      }
    } else if (isError) {
      setUserData({ isLoggedIn: false });
    }
  }, [data, setUserData, isSuccess, isError]);

  if (!userData) return <Loader />;

  return children;
};

CheckAuth.propTypes = {
  children: PropTypes.object
};

export default CheckAuth;

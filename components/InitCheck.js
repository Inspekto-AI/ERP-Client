import { useContext, useEffect } from 'react';
import { GlobalContext } from 'context/GlobalContext';
import Loader from 'components/Loader';
import PropTypes from 'prop-types';
import axios from 'axios';

const InitCheck = ({ children }) => {
  const { trippingStatus, setTrippingStatus } = useContext(GlobalContext);

  useEffect(() => {
    const fetchTrippingStatus = async () => {
      const res = await axios.get('/api/init');
      setTrippingStatus(res.data);
    }
    fetchTrippingStatus();
  }, []);

  if (trippingStatus===null) return <Loader />;

  return children;
};

InitCheck.propTypes = {
  children: PropTypes.object
};

export default InitCheck;

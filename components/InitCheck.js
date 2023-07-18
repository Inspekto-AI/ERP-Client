import { useContext, useEffect } from 'react';
import { GlobalContext } from 'context/GlobalContext';
import Loader from 'components/Loader';
import PropTypes from 'prop-types';
import axios from 'axios';
import { get } from 'utils/api';

function InitCheck({ children }) {
  const {
    trippingStatus,
    setTrippingStatus,
    bagTypes,
    setBagTypes,
    setDeactivateLoaderSolution,
    setDeactivatePrintingSolution,
    numberOfWhatsappRecipient,
    setNumberOfWhatsappRecipient
  } = useContext(GlobalContext);

  useEffect(() => {
    const fetchTrippingStatus = async () => {
      const res = await axios.get('/api/init');
      setTrippingStatus(res.data);
    };
    const fetchInitialData = async () => {
      const res = await get('/api/configuration/initialize-frontend');
      const bag_types = res?.data?.data?.bag_types;
      const deactivate_loader_solution =
        res?.data?.data?.deactivate_loader_solution;
      const deactivate_printing_solution =
        res?.data?.data?.deactivate_printing_solution;
      const number_of_whatsapp_recipient =
        res?.data?.data?.number_of_whatsapp_recipient;
      setBagTypes(bag_types.split(','));
      setDeactivateLoaderSolution(deactivate_loader_solution === 1);
      setDeactivatePrintingSolution(deactivate_printing_solution === 1);
      setNumberOfWhatsappRecipient(number_of_whatsapp_recipient);
    };
    fetchTrippingStatus();
    fetchInitialData();
  }, []);

  if (trippingStatus === null || !bagTypes) return <Loader />;

  return children;
}

InitCheck.propTypes = {
  children: PropTypes.object
};

export default InitCheck;

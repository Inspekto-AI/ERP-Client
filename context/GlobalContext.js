import { useState, createContext } from 'react';
import PropTypes from 'prop-types';
import { getLocalStorage, setLocalStorage } from 'utils/storage';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [beltTrippingEnabled, setBeltTrippingEnabled] = useState(false);
  const [trippingStatus, setTrippingStatus] = useState(null);
  const [userData, setUserData] = useState(null);
  const [bagTypes, setBagTypes] = useState(null);
  const [deactivateLoaderSolution, setDeactivateLoaderSolution] = useState(0);
  const [deactivatePrintingSolution, setDeactivatePrintingSolution] = useState(0);
  const [shipmentOverflow, setShipmentOverflow] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        trippingStatus,
        setTrippingStatus,
        beltTrippingEnabled,
        setBeltTrippingEnabled,
        userData,
        setUserData,
        bagTypes,
        setBagTypes,
        deactivateLoaderSolution,
        setDeactivateLoaderSolution,
        deactivatePrintingSolution,
        setDeactivatePrintingSolution,
        shipmentOverflow,
        setShipmentOverflow,
        getLocalStorage,
        setLocalStorage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.object,
};

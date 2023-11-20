import React, { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext();

export function GlobalProvider({ children }) {
  const [beltTrippingEnabled, setBeltTrippingEnabled] = useState(false);
  const [trippingStatus, setTrippingStatus] = useState(null);
  const [userData, setUserData] = useState(null);
  const [bagTypes, setBagTypes] = useState(null);
  const [deactivateLoaderSolution, setDeactivateLoaderSolution] = useState(0);
  const [deactivatePrintingSolution, setDeactivatePrintingSolution] = useState(0);
  const [shipmentOverflow, setShipmentOverflow] = useState(false);
  const [numberOfWhatsappRecipient, setNumberOfWhatsappRecipient] = useState(0);
  const [isQfullError, setIsQfullError] = useState(null);
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
        numberOfWhatsappRecipient,
        setNumberOfWhatsappRecipient,
        isQfullError,
        setIsQfullError,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

GlobalProvider.propTypes = {
  children: PropTypes.object,
};

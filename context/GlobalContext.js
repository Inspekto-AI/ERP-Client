import { useState, createContext } from 'react';
import PropTypes from 'prop-types';

export const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
  const [beltTrippingEnabled, setBeltTrippingEnabled] = useState(false);
  const [trippingStatus, setTrippingStatus] = useState(null);

  return (
    <GlobalContext.Provider
      value={{
        trippingStatus,
        setTrippingStatus,
        beltTrippingEnabled,
        setBeltTrippingEnabled
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

GlobalProvider.propTypes = {
  children: PropTypes.any
};

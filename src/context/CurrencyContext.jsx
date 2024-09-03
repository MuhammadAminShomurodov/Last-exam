import { createContext, useState } from "react";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [watchList, setWatchList] = useState([]);

  const addToWatchList = (crypto) => {
    if (!watchList.find(item => item.id === crypto.id)) {
      setWatchList([...watchList, crypto]);
    }
  };

  const removeFromWatchList = (cryptoId) => {
    setWatchList(watchList.filter(item => item.id !== cryptoId));
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, watchList, addToWatchList, removeFromWatchList }}>
      {children}
    </CurrencyContext.Provider>
  );
};

import PropTypes from 'prop-types';

CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

import { createContext, useState } from "react";
import PropTypes from "prop-types";

export const CurrencyContext = createContext();

export const CurrencyProvider = ({ children }) => {
  const [currency, setCurrency] = useState("USD");
  const [watchList, setWatchList] = useState([]);

  const addToWatchList = (crypto) => {
    setWatchList((prevList) => {
      const isAlreadyInWatchlist = prevList.some(
        (item) => item.id === crypto.id
      );
      if (isAlreadyInWatchlist) {
        return prevList.filter((item) => item.id !== crypto.id);
      }
      return [...prevList, crypto];
    });
  };

  const removeFromWatchList = (cryptoId) => {
    setWatchList((prevList) => prevList.filter((item) => item.id !== cryptoId));
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        watchList,
        addToWatchList,
        removeFromWatchList,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

CurrencyProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

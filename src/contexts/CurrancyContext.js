// // src/contexts/CurrencyContext.jsx
// import { createContext, useState, useContext } from 'react';

// const CurrencyContext = createContext();

// export const CurrencyProvider = ({ children }) => {
//   const [currency, setCurrency] = useState('USD');

//   return (
//     <CurrencyContext.Provider value={{ currency, setCurrency }}>
//       {children}
//     </CurrencyContext.Provider>
//   );
// };

// export const useCurrency = () => {
//   const context = useContext(CurrencyContext);
//   if (context === undefined) {
//     throw new Error('useCurrency must be used within a CurrencyProvider');
//   }
//   return context;
// };

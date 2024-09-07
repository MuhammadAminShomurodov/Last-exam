import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import { CurrencyContext } from "../context/CurrencyContext";
import { FaEye, FaRegEye } from "react-icons/fa";
import "./Currancy.scss";
import "./Spinner.scss"; // Import the spinner CSS

const ErrorMessage = ({ message }) => (
  <div className="error-message">
    <p>{message}</p>
  </div>
);

import PropTypes from 'prop-types';

ErrorMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const Currancy = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {
    currency,
    watchList = [],
    addToWatchList,
  } = useContext(CurrencyContext);

  useEffect(() => {
    const fetchCryptos = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets",
          {
            params: {
              vs_currency: currency.toLowerCase(),
              order: "gecko_desc",
              per_page: 50,
              page: 1,
              sparkline: false,
              price_change_percentage: "24h",
            },
          }
        );
        console.log(response.data); // Ma'lumotlar kelayotganini tekshiring
        setCryptos(response.data);
      } catch (error) {
        console.error("Error fetching the crypto data:", error);
        setError("Failed to fetch data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchCryptos();
  }, [currency]);

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCryptos = filteredCryptos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const currencySymbols = {
    USD: "$",
    RUB: "₽",
    UZS: "so'm",
  };

  return (
    <div className="Currancy">
      <div className="container">
        <div className="currancy-text">
          <h2>Cryptocurrency Prices by Market Cap</h2>
          <input
            type="text"
            placeholder="Search For a Crypto Currency.."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Qidiruv bo'yicha sahifani qayta o'rnatish
            }}
          />
        </div>

        {loading && (
          <div className="loading-container">
            <div className="spinner"></div>
          </div>
        )}
        {error && <ErrorMessage message={error} />}

        {!loading && !error && (
          <div className="crypto-table">
            <table>
              <thead>
                <tr>
                  <th>Coin</th>
                  <th>Price</th>
                  <th>24h Change</th>
                  <th>Market Cap</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {paginatedCryptos.length > 0 ? (
                  paginatedCryptos.map((crypto) => (
                    <tr
                      key={crypto.id}
                      onClick={() => navigate(`/view/${crypto.id}`)}
                    >
                      <td className="crypto-name">
                        <img src={crypto.image} alt={crypto.name} />
                        <div>
                          <h3 className="symbol">
                            {crypto.symbol.toUpperCase()}
                          </h3>
                          <p className="name">{crypto.name}</p>
                        </div>
                      </td>
                      <td className="crypto-price">
                        {currencySymbols[currency]}
                        {crypto.current_price.toLocaleString()}
                      </td>
                      <td
                        className={
                          crypto.price_change_percentage_24h > 0
                            ? "positive"
                            : "negative"
                        }
                      >
                        <span className="change-icon">
                          {crypto.price_change_percentage_24h > 0 ? "🟢" : "🔴"}
                        </span>
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </td>
                      <td className="crypto-market-cap">
                        {currencySymbols[currency]}
                        {(crypto.market_cap / 1_000_000).toLocaleString()}M
                      </td>
                      <td>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addToWatchList(crypto);
                          }}
                          className={`move ${
                            watchList.some((item) => item.id === crypto.id)
                              ? "in-watch-list"
                              : ""
                          }`}
                        >
                          {watchList.some((item) => item.id === crypto.id) ? (
                            <FaEye size={20} />
                          ) : (
                            <FaRegEye size={20} />
                          )}
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No cryptocurrencies found</td>
                  </tr>
                )}
              </tbody>
            </table>

            <div className="pagination-container">
              <Pagination
                current={currentPage}
                pageSize={pageSize}
                total={filteredCryptos.length}
                onChange={(page, size) => {
                  setCurrentPage(page);
                  setPageSize(size);
                }}
                showSizeChanger
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Currancy;

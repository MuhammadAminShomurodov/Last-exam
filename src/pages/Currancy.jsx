import { useEffect, useState } from "react";
import axios from "axios";
import { Pagination } from "antd";
import { useNavigate } from "react-router-dom";
import "./Currancy.scss";

const Currancy = () => {
  const [cryptos, setCryptos] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "USD",
          order: "gecko_desc",
          per_page: 50,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      })
      .then((response) => {
        setCryptos(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the crypto data:", error);
      });
  }, []);

  const filteredCryptos = cryptos.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const paginatedCryptos = filteredCryptos.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  return (
    <div className="Currancy">
      <div className="container">
        <div className="currancy-text">
          <h2>Cryptocurrency Prices by Market Cap</h2>
          <input
            type="text"
            placeholder="Search For a Crypto Currency.."
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="crypto-table">
          <table>
            <thead>
              <tr>
                <th>Coin</th>
                <th>Price</th>
                <th>24h Change</th>
                <th>Market Cap</th>
              </tr>
            </thead>
            <tbody>
              {paginatedCryptos.map((crypto) => (
                <tr
                  key={crypto.id}
                  onClick={() => navigate(`/view/${crypto.id}`)}
                >
                  <td className="crypto-name">
                    <img src={crypto.image} alt={crypto.name} />
                    <div>
                      <h3 className="symbol">{crypto.symbol.toUpperCase()}</h3>
                      <p className="name">{crypto.name}</p>
                    </div>
                  </td>
                  <td className="crypto-price">
                    ₹{crypto.current_price.toLocaleString()}
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
                    ₹{(crypto.market_cap / 1_000_000).toLocaleString()}M
                  </td>
                </tr>
              ))}
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
      </div>
    </div>
  );
};

export default Currancy;

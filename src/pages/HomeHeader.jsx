import { useEffect, useState } from "react";
import axios from "axios";
import "./HomeHeader.scss";

const AllPages = () => {
  const [cryptos, setCryptos] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "USD",
          order: "gecko_desc",
          per_page: 10,
          page: 1,
          sparkline: false,
          price_change_percentage: "24h",
        },
      })
      .then((response) => {
        setCryptos(response.data);
        setLoading(false); 
      })
      .catch((error) => {
        console.error("Error fetching the crypto data:", error);
        setLoading(false); 
      });
  }, []);

  return (
    <div className="AllBg">
      <div className="AllPages">
        <div className="container">
          <div className="background">
            <h2>CRYPTOFOLIO WATCH LIST</h2>
            <p className="text">
              Get all the Info regarding your favorite Crypto Currency
            </p>

            {loading ? (
              <div className="spinner-container">
                <div className="spinner"></div>
              </div>
            ) : (
              <div className="crypto-list">
                {cryptos.map((crypto) => (
                  <div key={crypto.id} className="crypto-item">
                    <img
                      src={crypto.image}
                      alt={crypto.name}
                      className="crypto-image"
                    />
                    <p className="symbol">
                      {crypto.symbol.toUpperCase()}{" "}
                      <span>
                        {crypto.price_change_percentage_24h.toFixed(2)}%
                      </span>
                    </p>
                    <p className="price">
                      ₹{crypto.current_price.toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPages;

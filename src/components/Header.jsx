import  { useContext, useState } from "react";
import { CurrencyContext } from "../context/CurrencyContext";
import styles from "./Header.module.scss";

const Header = () => {
  const { currency, setCurrency, watchList, removeFromWatchList } =
    useContext(CurrencyContext);
  const [showSidebar, setShowSidebar] = useState(false);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  return (
    <div className="container">
      <div className={styles.Header}>
        <div className={styles["header-all"]}>
          <div className={styles["header-left"]}>
            <h1>CRYPTOFOLIO</h1>
          </div>
          <div className={styles["header-right"]}>
            <select value={currency} onChange={handleCurrencyChange}>
              <option value="USD">USD</option>
              <option value="RUB">RUB</option>
              <option value="UZB">UZB</option>
            </select>
            <button onClick={() => setShowSidebar(!showSidebar)}>
              WATCH LIST
            </button>
          </div>
        </div>
      </div>

      <div
        className={`${styles.Sidebar} ${
          showSidebar ? styles.visible : styles.hidden
        }`}
      >
        <button
          className={styles["close-btn"]}
          onClick={() => setShowSidebar(false)}
        >
          &times;
        </button>
        <h3>Watch List</h3>
        {watchList.length === 0 ? (
          <p>No coins added</p>
        ) : (
          <ul>
            {watchList.map((crypto) => (
              <li key={crypto.id}>
                <div className={styles["crypto-name"]}>
                  <img src={crypto.image} alt={crypto.name} />
                  <div>
                    <h3 className={styles.symbol}>
                      {crypto.symbol.toUpperCase()}
                    </h3>
                    <p className={styles.name}>{crypto.name}</p>
                  </div>
                </div>
                <button onClick={() => removeFromWatchList(crypto.id)}>
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Header;

import "./Header.scss";

const Header = () => {
  return (
    <div className="Header">
      <div className="container">
        <div className="header-all">
          <div className="header-left">
            <h1>CRYPTOFOLIO</h1>
          </div>
          <div className="header-right">
            <select name="" id="">
              <option value="USD">USD</option>
              <option value="RUB">RUB</option>
              <option value="UZB">UZB</option>
            </select>
            <button>WATCH LIST</button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Header;

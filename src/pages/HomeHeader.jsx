import { useEffect, useState } from "react";
import axios from "axios";
import Slider from "react-slick";
import "./HomeHeader.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

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

  const settings = {
    dots: false, // Disable dots
    infinite: true, // Enable infinite scrolling
    speed: 2000, // Speed of the sliding effect (2 seconds)
    slidesToShow: 4, // Show 4 items at once
    slidesToScroll: 1, // Scroll 1 item at a time
    autoplay: true, // Enable autoplay
    autoplaySpeed: 0, // Keep it continuous without pause
    cssEase: "linear", // Make the scrolling smooth and continuous
    arrows: false, // Disable previous/next buttons
    pauseOnHover: false, // Prevent the slider from stopping on hover
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

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
              <Slider {...settings}>
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
              </Slider>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllPages;

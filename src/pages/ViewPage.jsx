import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "@ant-design/charts";
import { CurrencyContext } from "../context/CurrencyContext";
import "./ViewPage.scss";

const ViewPage = () => {
  const { id } = useParams();
  const { currency } = useContext(CurrencyContext); // Access selected currency
  const [crypto, setCrypto] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState("24h");

  // Fetch cryptocurrency details
  useEffect(() => {
    axios
      .get(`https://api.coingecko.com/api/v3/coins/${id}`)
      .then((response) => {
        setCrypto(response.data);
      })
      .catch((error) => {
        console.error("Error fetching the crypto details:", error);
      });
  }, [id]);

  // Fetch chart data whenever id, timeframe, or currency changes
  useEffect(() => {
    const fetchChartData = async () => {
      let days;
      switch (timeframe) {
        case "24h":
          days = 1;
          break;
        case "30d":
          days = 30;
          break;
        case "3m":
          days = 90;
          break;
        case "1y":
          days = 365;
          break;
        default:
          days = 1;
      }

      try {
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=${currency.toLowerCase()}&days=${days}`
        );
        console.log(response.data); // Log data to check its structure

        // Convert response data to format compatible with the Line chart
        const prices = response.data.prices.map((price) => ({
          time: new Date(price[0]).toLocaleTimeString(), // Show time for 24h data
          value: price[1],
        }));
        setChartData(prices);
      } catch (error) {
        console.error("Error fetching the market data:", error);
      }
    };

    fetchChartData();
  }, [id, timeframe, currency]); // Dependencies to trigger effect

  if (!crypto) return <div>Loading...</div>;

  const currencySymbols = {
    USD: "$",
    RUB: "₽",
    UZS: "so'm",
  };

  const config = {
    data: chartData,
    height: 400,
    xField: "time",
    yField: "value",
    smooth: true,
    lineStyle: {
      stroke: "#00bcd4",
      lineWidth: 2,
    },
    color: "#00bcd4",
    point: {
      size: 5,
      shape: "diamond",
      style: {
        fill: "white",
        stroke: "#00bcd4",
        lineWidth: 2,
      },
    },
    tooltip: {
      showCrosshairs: true,
      shared: true,
      showMarkers: true,
    },
    xAxis: {
      tickCount: timeframe === "24h" ? 6 : 5, // Adjust tick count based on timeframe
      tickInterval: timeframe === "24h" ? 3600 * 1000 : undefined, // Adjust tick interval for 24h timeframe
      label: {
        autoHide: true,
        autoRotate: true,
      },
    },
  };

  return (
    <div className="view-page">
      <div className="crypto-info">
        <img
          src={crypto.image?.large}
          alt={crypto.name}
          className="crypto-logo"
        />
        <h1 className="crypto-name">{crypto.name}</h1>
        <p className="crypto-description">
          {crypto.description?.en?.split(".")[0]}.
        </p>
        <p className="crypto-rank">
          <strong>Rank:</strong> {crypto.market_cap_rank}
        </p>
        <p className="crypto-price">
          <strong>Current Price:</strong> {currencySymbols[currency]}
          {crypto.market_data?.current_price?.[
            currency.toLowerCase()
          ]?.toLocaleString() || "Data not available"}
        </p>
        <p className="crypto-market-cap">
          <strong>Market Cap:</strong> {currencySymbols[currency]}
          {(
            crypto.market_data?.market_cap?.[currency.toLowerCase()] / 1_000_000
          )?.toLocaleString() || "Data not available"}
          M
        </p>
      </div>
      <div className="crypto-chart">
        <Line {...config} />
      </div>
      <div className="chart-buttons">
        <button className="timeframe-btn" onClick={() => setTimeframe("24h")}>
          24 Hours
        </button>
        <button className="timeframe-btn" onClick={() => setTimeframe("30d")}>
          30 Days
        </button>
        <button className="timeframe-btn" onClick={() => setTimeframe("3m")}>
          3 Months
        </button>
        <button className="timeframe-btn" onClick={() => setTimeframe("1y")}>
          1 Year
        </button>
      </div>
    </div>
  );
};

export default ViewPage;

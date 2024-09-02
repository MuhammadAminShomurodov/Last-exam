import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { Line } from "@ant-design/charts";
import "./ViewPage.scss";

const ViewPage = () => {
  const { id } = useParams();
  const [crypto, setCrypto] = useState(null);
  const [chartData, setChartData] = useState([]);
  const [timeframe, setTimeframe] = useState("24h");

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
          `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=inr&days=${days}`
        );

        const prices = response.data.prices.map((price) => ({
          time: new Date(price[0]).toLocaleString(), 
          value: price[1],
        }));
        setChartData(prices);
      } catch (error) {
        console.error("Error fetching the market data:", error);
      }
    };

    fetchChartData();
  }, [id, timeframe]);

  if (!crypto) return <div>Loading...</div>;

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
    },
  };

  return (
    <div className="view-page">
      <div className="crypto-info">
        <img
          src={crypto.image.large}
          alt={crypto.name}
          className="crypto-logo"
        />
        <h1 className="crypto-name">{crypto.name}</h1>
        <p className="crypto-description">
          {crypto.description.en.split(".")[0]}.
        </p>
        <p className="crypto-rank">
          <strong>Rank:</strong> {crypto.market_cap_rank}
        </p>
        <p className="crypto-price">
          <strong>Current Price:</strong>  ₹
          {crypto.market_data.current_price.inr.toLocaleString()}
        </p>
        <p className="crypto-market-cap">
          <strong>Market Cap:</strong>  ₹
          {(crypto.market_data.market_cap.inr / 1_000_000).toLocaleString()}M
        </p>
      </div>
      <div className="crypto-chart">
        <Line {...config} />
      </div>
      <div className="chart-buttons">
        <button
          className="timeframe-btn"
          onClick={() => setTimeframe("24h")}
        >
          24 Hours
        </button>
        <button
          className="timeframe-btn"
          onClick={() => setTimeframe("30d")}
        >
          30 Days
        </button>
        <button
          className="timeframe-btn"
          onClick={() => setTimeframe("3m")}
        >
          3 Months
        </button>
        <button
          className="timeframe-btn"
          onClick={() => setTimeframe("1y")}
        >
          1 Year
        </button>
      </div>
    </div>
  );
};

export default ViewPage;

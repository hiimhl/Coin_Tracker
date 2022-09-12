import React from "react";
import { useQuery } from "react-query";
import { fetchCoinHistory } from "./api";
import ApexChart from "react-apexcharts"; //ApexChart가 아닌 다른 이름으로 import해도 됨.

interface IHistorical {
  time_open: number;
  time_close: number;
  open: string;
  high: string;
  low: string;
  close: string;
  volume: string;
  market_cap: number;
}

interface CharProps {
  coinId: string;
  isDark: boolean;
}
function Chart({ coinId, isDark }: CharProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="candlestick"
          series={[
            {
              data:
                // {
                //   x: 1212121,
                //   y: [52.76, 57.35, 52.15, 57.03], //open,high,low,close
                // },
                data?.map((price) => {
                  return {
                    x: new Date(price.time_open),
                    y: [price.open, price.high, price.low, price.close],
                  };
                }) as [],
            },
          ]}
          options={{
            theme: {
              mode: isDark ? "dark" : "light",
            },
            chart: {
              // type: "candlestick",
              height: 500,
              width: 500,
              toolbar: { show: false },
              background: "rgba(255, 255, 255, 0.06)",
            },
            grid: { show: false },
            yaxis: { show: false },
            xaxis: {
              axisBorder: { show: false },
              axisTicks: { show: false },
              labels: { show: false },
              type: "datetime",
              categories: data?.map((price) =>
                new Date(price.time_close * 1000).toISOString()
              ),
            },
            plotOptions: {
              candlestick: {
                colors: {
                  upward: "#00a6fb",
                  downward: "#f72585",
                },
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

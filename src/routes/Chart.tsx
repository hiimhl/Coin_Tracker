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
}
function Chart({ coinId }: CharProps) {
  const { isLoading, data } = useQuery<IHistorical[]>(["ohlcv", coinId], () =>
    fetchCoinHistory(coinId)
  );
  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <ApexChart
          type="line"
          series={[
            {
              name: "price",
              data: data?.map((price) => price.close) as [],
            },
          ]}
          options={{
            theme: {
              mode: "dark",
            },
            chart: {
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
            stroke: {
              curve: "smooth",
              width: 4,
            },
            fill: {
              type: "gradient",
              gradient: { gradientToColors: ["#f72585"], stops: [0, 100] },
            },
            colors: ["#00a6fb"],
            tooltip: {
              y: {
                formatter: (value) => `$${value.toFixed(3)}`,
              },
            },
          }}
        />
      )}
    </div>
  );
}

export default Chart;

import React from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { fetchCoinPrice } from "./api";

const PriceList = styled.ul``;

const PriceItem = styled.li`
  // background-color: ${(props) => props.theme.boxColor};
  border: ${(props) => props.theme.borderColor} 1px solid;
  width: 100%;
  border-radius: 10px;

  height: 50px;
  margin-bottom: 15px;
  padding-left: 20px;

  align-item: center;
  justify-content: center;

  // text-align: center;
  display: grid;
  grid-template-columns: repeat(2, 1fr);

  span {
    color: ${(props) => props.theme.textColor};
    margin-top: 15px;
  }
  span:last-child {
    color: ${(props) => props.theme.accentColor};
    font-weight: 600;
  }
`;

interface ICoinProps {
  coinId: string;
}

interface ITickers {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      market_cap: number;
      percent_change_15m: number;
      percent_change_1h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      ath_price: number;
    };
  };
}

function Price({ coinId }: ICoinProps) {
  const { isLoading, data } = useQuery<ITickers>(["tickers", coinId], () =>
    fetchCoinPrice(coinId)
  );

  return (
    <PriceList>
      {isLoading ? (
        "Loading..."
      ) : (
        <>
          <PriceItem key={data?.quotes.USD.price}>
            <span>Price : </span>
            <span>{data?.quotes.USD.price}</span>
          </PriceItem>
          <PriceItem key={data?.quotes.USD.volume_24h}>
            <span>Volume 24h : </span>
            <span>{data?.quotes.USD.volume_24h}</span>
          </PriceItem>
          <PriceItem key={data?.quotes.USD.percent_change_15m}>
            <span>Percent Change 15m : </span>
            <span>{data?.quotes.USD.percent_change_15m}</span>
          </PriceItem>
          <PriceItem key={data?.quotes.USD.percent_change_1h}>
            <span>Percent Change 1h : </span>
            <span>{data?.quotes.USD.percent_change_1h}</span>
          </PriceItem>
          <PriceItem key={data?.quotes.USD.percent_change_24h}>
            <span>Percent Change 24h : </span>
            <span>{data?.quotes.USD.percent_change_24h}</span>
          </PriceItem>
          <PriceItem key={data?.quotes.USD.percent_change_7d}>
            <span>Percent Change 7d : </span>
            <span>{data?.quotes.USD.percent_change_7d}</span>
          </PriceItem>
          <PriceItem key={data?.quotes.USD.ath_price}>
            <span>ATH Price : </span>
            <span>{data?.quotes.USD.ath_price}</span>
          </PriceItem>
        </>
      )}
    </PriceList>
  );
}

export default Price;

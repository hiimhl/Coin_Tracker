import React from "react";
import {
  useParams,
  useLocation,
  Routes,
  Route,
  Link,
  useMatch,
} from "react-router-dom";
import { Helmet } from "react-helmet";
import styled from "styled-components";
import Chart from "./Chart";
import Price from "./Price";
import { useQuery } from "react-query";
import { fetchCoinInfo, fetchCoinPrice } from "./api";

//styled components
const Container = styled.div`
  padding: 0px 20px;
  max-width: 480px;
  margin: 0 auto;
`;
const Header = styled.header`
  height: 10vh;
  display: felx;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 48px;
  font-weight: 600;
  font-style: italic;
  color: ${(props) => props.theme.accentColor};
`;

const Loader = styled.span`
  text-align: center;
  font-size: 25px;
  display: block;
`;

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: ${(props) => props.theme.boxColor};
  padding: 10px 20px;
  border-radius: 10px;
`;
const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 12px;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 5px;
  }
`;
const Description = styled.p`
  margin: 30px 0px;
  line-height: 21px;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  margin: 30px 0px;
  gap: 10px;
`;

const Tab = styled.span<{ isActive: boolean }>`
  text-align: center;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 400;
  transition: 0.3s ease-in;
  background-color: ${(props) =>
    props.isActive ? props.theme.hoverColor : props.theme.boxColor};
  padding: 10px 0px;
  border-radius: 10px;
  color: ${(props) =>
    props.isActive ? props.theme.hoverTextColor : props.theme.textColor};
  a {
    display: block;
  }
  &:hover {
    background-color: ${(props) => props.theme.hoverColor};
    color: ${(props) => props.theme.hoverTextColor};
  }
`;

const HomeBtn = styled.button<{ isActive: boolean }>`
  padding: 10px 20px;
  border: none;
  background-color: ${(props) => props.theme.hoverColor};
  border-radius: 10px;
  color: ${(props) => props.theme.hoverTextColor};
  transition: background-color 0.3s ease-in, color 0.3s ease-in;
  text-weight: 600;
  font-size: 15px;
  margin-top: 10px;

  &:hover {
    cursor: pointer;
  }
`;

interface RouteState {
  state: { name: string };
}

//?????????????????? ????????? ??? ???????????? ?????????????????? ????????? ????????? I??? ???????????? ?????? ??????.(???????????? ?????????)
interface InfoData {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  first_data_at: string;
  last_data_at: string;
}

interface PriceData {
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
      ath_date: string;
      ath_price: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_1h: number;
      percent_change_1y: number;
      percent_change_6h: number;
      percent_change_7d: number;
      percent_change_12h: number;
      percent_change_15m: number;
      percent_change_24h: number;
      percent_change_30d: number;
      percent_change_30m: number;
      percent_from_price_ath: number;
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
    };
  };
}

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();

  // Link state??? ?????? state ??????.
  const { state } = useLocation() as RouteState;

  //useMatch(match??? url). ??????????????? object??? ???????????? ???????????? null??? ??????.
  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");

  //useQuery - Data fetch
  const { isLoading: infoLoading, data: infoData } = useQuery<InfoData>(
    ["info", coinId],
    () => fetchCoinInfo(coinId || "")
    // ! ?????? ?????? ???????????? ?????? ????????? ?????? ?????? ????????? ????????? ?????? ????????? ?????? ????????? ??? ?????????.
  );
  const { isLoading: priceLoading, data: priceData } = useQuery<PriceData>(
    ["price", coinId],
    () => fetchCoinPrice(coinId || ""),
    {
      refetchInterval: 5000,
      //5????????? refetch -> ???????????? ?????? ???????????? ???.
    }
  );

  const loading = infoLoading || priceLoading;

  return (
    <Container>
      <Helmet>
        {/* ????????? ????????? head??? ???????????????.  */}
        <title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </title>
      </Helmet>
      <Header>
        <Title>
          {state?.name ? state.name : loading ? "Loading..." : infoData?.name}
        </Title>
      </Header>
      {loading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{infoData?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Symbol:</span>
              <span>${infoData?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${priceData?.quotes.USD.price.toFixed(3)}</span>
            </OverviewItem>
          </Overview>
          <Description>{infoData?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{priceData?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{priceData?.max_supply}</span>
            </OverviewItem>
          </Overview>

          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to={`/${coinId}/chart`}>Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to={`/${coinId}/price`}>Price</Link>
            </Tab>
          </Tabs>

          <Routes>
            <Route path="/price" element={<Price coinId={coinId!} />} />
            <Route path="/chart" element={<Chart coinId={coinId!} />} />
          </Routes>
        </>
      )}
      <Link to={"/"}>
        <HomeBtn isActive={chartMatch !== null}>&lt; Home</HomeBtn>
      </Link>
    </Container>
  );
}

export default Coin;

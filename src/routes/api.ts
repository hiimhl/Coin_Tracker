//fetcher 함수는 꼭 fetch promise를 return해줘야 한다.
const BASE_URL = `https://api.coinpaprika.com/v1`;

//coins
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`) //
    .then((respones) => respones.json());
}

//coin
export function fetchCoinInfo(coinId: string) {
  if (coinId === "Coin_Tracker") {
    coinId = "";
  }
  return fetch(`${BASE_URL}/coins/${coinId}`) //
    .then((respones) => respones.json());
}

export function fetchCoinPrice(coinId: string) {
  if (coinId === "Coin_Tracker") {
    coinId = "";
  }
  return fetch(`${BASE_URL}/tickers/${coinId}`) //
    .then((respones) => respones.json());
}

export function fetchCoinHistory(coinId: string) {
  const endDate = Math.floor(Date.now() / 1000);
  // const startDate = endDate - 60 * 60 * 24;
  return fetch(`https://ohlcv-api.nomadcoders.workers.dev?coinId=${coinId}`) //
    .then((res) => res.json());
}

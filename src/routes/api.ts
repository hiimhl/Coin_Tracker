//fetcher 함수는 꼭 fetch promise를 return해줘야 한다.
const BASE_URL = `https://api.coinpaprika.com/v1`;

//coins
export function fetchCoins() {
  return fetch(`${BASE_URL}/coins`) //
    .then((respones) => respones.json());
}

//coin
export function fetchCoinInfo(coinId: string) {
  return fetch(`${BASE_URL}/coins/${coinId}`) //
    .then((respones) => respones.json());
}

export function fetchCoinPrice(coinId: string) {
  return fetch(`${BASE_URL}/tickers/${coinId}`) //
    .then((respones) => respones.json());
}

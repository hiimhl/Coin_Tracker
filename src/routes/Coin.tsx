import React from "react";
import { useParams } from "react-router";

// interface RouteParams {
//   coinId: string;
// } useParams 안에 interface값을 전달해도 된다.

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();

  return <h1>Coin : {coinId}</h1>;
}

export default Coin;

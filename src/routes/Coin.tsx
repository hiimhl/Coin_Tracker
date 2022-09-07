import React from "react";
import { useParams, useLocation } from "react-router-dom";
import { useState } from "react";
import styled from "styled-components";

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

interface RouteState {
  state: { name: string };
}

function Coin() {
  const { coinId } = useParams<{ coinId: string }>();
  const [loading, setLoading] = useState(true);

  // Link state로 보낸 state 받기.
  // const name = location.state as RouteState;
  const { state } = useLocation() as RouteState;

  return (
    <Container>
      <Header>
        <Title>{state?.name || "Loading..."}</Title>
      </Header>
      {loading ? <Loader>Loading...</Loader> : null}
    </Container>
  );
}

export default Coin;

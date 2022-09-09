import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

function Router() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:coinId/*" element={<Coin />} />
        <Route path="/" element={<Coins />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;

import { HashRouter, Routes, Route } from "react-router-dom";
import React from "react";
import Coins from "./routes/Coins";
import Coin from "./routes/Coin";

interface IRouterProps {
  toggleDark: () => void;
  isDark: boolean;
}

function Router({ toggleDark, isDark }: IRouterProps) {
  return (
    <HashRouter>
      <Routes>
        <Route path="/:coinId/*" element={<Coin isDark={isDark} />} />
        <Route path="/" element={<Coins toggleDark={toggleDark} />} />
      </Routes>
    </HashRouter>
  );
}

export default Router;

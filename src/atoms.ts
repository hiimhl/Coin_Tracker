import { atom } from "recoil";

export const isDarkAtom = atom({
  //require 2 things, (key, default)
  key: "isDark",
  default: false,
});

import { DefaultTheme } from "styled-components";
// theme 타입을 정의한 파일.

export const lightTheme: DefaultTheme = {
  bgColor: "#cbf3f0",
  textColor: "#051923", //#cae9ff
  accentColor: "#7678ed", //2ec4b6
  boxColor: "rgba(0, 175, 185, 0.2)",
  hoverColor: "#00afb9",
  hoverTextColor: "white",
  switchColor: "#C9C9C9",
  borderColor: "rgba(0, 175, 185, 0.8)",
  cardBgColor: "white",
};

export const darkTheme: DefaultTheme = {
  bgColor: "#272643",
  textColor: "white",
  accentColor: "#d9ed92",
  boxColor: "rgba(255, 255, 255, 0.3)",
  hoverColor: "rgba(222, 183, 255, 0.3)", //purple
  hoverTextColor: "white",
  switchColor:
    "linear-gradient( to right,hsl(210, 78%, 56%),hsl(146, 68%, 55%))",
  borderColor: "white",
  cardBgColor: "transparent",
};

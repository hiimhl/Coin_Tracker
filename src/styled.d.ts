import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    textColor: string;
    bgColor: string;
    accentColor: string;
    boxColor: string;
    hoverColor: string;
    hoverTextColor: string;
    switchColor: string;
    borderColor: string;
  }
}

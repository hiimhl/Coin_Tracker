import styled from "styled-components";
import React, { useState } from "react";

const ToggleBtn = styled.div<IChecked>`
  padding-top: 35px;
  position: absolute;
  right: 15%;

  width: 150px;
  height: 40px;
  display: flex;
  text-align: center;
  justify-content: center;

  span {
    margin-top: 6px;
    padding-right: 7px;
    font-weight: 600;
  }

  label {
    background-color: blue;
    width: 60px;
    height: 28px;
    display: inline-block;
    background: ${(props) =>
      props.checked
        ? "linear-gradient( to right,hsl(210, 78%, 56%),hsl(146, 68%, 55%))"
        : "gray"};
    align-items: center;
    cursor: pointer;
    border-radius: 20px;
  }

  #toggle {
    display: none;
  }
`;

const Boll = styled.div<IChecked>`
  background-color: white;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  transform: translate(5px, 4px);
  transition: transform 0.3s ease-in;
  ${(props) => props.checked && "transform: translate(35px, 4px)"};
`;

interface IChecked {
  checked: boolean;
}

function Toggle({ onChecked }: any) {
  const [btn, setBtn] = useState(false);

  const toggleDarkTheme = () => {
    setBtn(!btn);
    if (btn) {
      onChecked(true);
    } else {
      onChecked(false);
    }
  };

  return (
    <ToggleBtn checked={btn}>
      <span>{btn ? "Dark Mode" : "Light Mode"}</span>
      <label htmlFor="toggle">
        <Boll checked={btn}></Boll>
      </label>
      <input
        id="toggle"
        type="checkbox"
        checked={btn}
        onChange={toggleDarkTheme}
      />
    </ToggleBtn>
  );
}

export default Toggle;

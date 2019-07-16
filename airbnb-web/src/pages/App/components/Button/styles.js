import styled from "styled-components";
import { darken } from "polished";

export const Button = styled.button`
  width: 10px;
  height: 60px;
  border-radius: 100px;
  border: none;
  background-color: ${({ color }) => color};
  margin-top: 10px;
  color: #fff;
  i {
    font-size: 18px;
  }
  &:hover {
    background-color: ${({ color }) => darken(0.05, color)};
  }
  &:active {
    background-color: ${({ color }) => darken(0.07, color)};
  }
`;
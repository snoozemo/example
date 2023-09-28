"use client";
import { styled } from "styled-components";

export const P5Box = styled.div<{
  $rotate?: string;
}>`
  background-color: #d31400;
  position: relative;
  filter: url(#outline);
  box-shadow: 0 0 0 1px #0003;
  &::before {
    position: absolute;
    top: 0;
    left: 0;
    content: "";
    z-index: -1;
    width: 100%;
    height: 100%;
    display: block;
    background-color: #d31400;
    transform: ${(props) => props.$rotate || "rotate(2deg)"};
  }
`;

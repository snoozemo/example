"use client";
import { styled } from "styled-components";
import {
  P5_TOKEN_COLOR,
  P5_TOKEN_REG_STRING,
  P5_TOKEN_ROTATE,
} from "./P5Token";
// import { useState } from "react";

export function P5Title({
  children,
  ...props
}: P5.P5TitleProps): JSX.Element | null {
  if (!children) return null;
  const spans = children.split("").map((char, index) => {
    if (char === " ") return <span key={index}>&nbsp;&nbsp;</span>;
    const attrs = GetP5TitleStyle(index, char);
    return (
      <P5BlockChar key={index} $char={char} {...attrs} {...props}>
        {char}
      </P5BlockChar>
    );
  });
  return <>{spans}</>;
}
export function P5Text({
  children,
  rotate,
  beforeColor: $beforeColor,
  afterColor: $afterColor,
  color: $color,
  ...props
}: P5.P5TextProps): JSX.Element | null {
  if (!children) return null;
  const spans = children.split("").map((char, index) => {
    if (char === " ") return <span key={index}>&nbsp;</span>;
    const { $rotate } = GetP5TextStyle(index, char);

    const attrs = {
      $beforeColor,
      $afterColor,
      $color,
      $rotate: rotate ? $rotate : P5_TOKEN_ROTATE.NONE,
      $char: char,
    };
    return (
      <P5Char key={index} {...attrs} {...props}>
        {char}
      </P5Char>
    );
  });
  return <>{spans}</>;
}
function GetP5TitleStyle(index: number, char: string) {
  const Remainder = index % 10;
  const IsMask = new RegExp(P5_TOKEN_REG_STRING.PUNCTUATION_REG).test(char);
  const $rotate = [0, 3, 6].includes(Remainder)
    ? P5_TOKEN_ROTATE.LEFT
    : [2, 5, 8, 7].includes(Remainder) || IsMask
    ? P5_TOKEN_ROTATE.RIGHT
    : P5_TOKEN_ROTATE.NONE;
  const $innerRotate = [1, 7, 9].includes(Remainder)
    ? P5_TOKEN_ROTATE.LEFT
    : [0, 4, 6].includes(Remainder)
    ? P5_TOKEN_ROTATE.RIGHTX2
    : P5_TOKEN_ROTATE.NONE;
  const $bgColor =
    [0, 3, 5, 8].includes(Remainder) && !IsMask
      ? P5_TOKEN_COLOR.RED
      : P5_TOKEN_COLOR.NONE;
  const $textColor = [2, 7].includes(Remainder);

  return { $rotate, $innerRotate, $bgColor, $textColor };
}
function GetP5TextStyle(index: number, char: string) {
  const Remainder = index % 10;
  const IsMask = new RegExp(P5_TOKEN_REG_STRING.PUNCTUATION_REG).test(char);
  const $rotate = [0, 3, 6].includes(Remainder)
    ? P5_TOKEN_ROTATE.LEFT
    : [2, 5, 8, 7].includes(Remainder) || IsMask
    ? P5_TOKEN_ROTATE.RIGHT
    : P5_TOKEN_ROTATE.NONE;
  const $reverse = [1, 4, 9].includes(Remainder);
  return { $rotate, $reverse };
}
/**
 * @description 用于P5Text的字体
 */
export const P5Char = styled.span<{
  $char?: string;
  $rotate?: string;
  $color?: string;
  $beforeColor?: string;
  $afterColor?: string;
}>`
  color: ${(props) => props.$color || "#fff"};
  font-weight: 400;
  position: relative;
  z-index: 0;
  display: inline-block;
  transform: ${(props) => props.$rotate};

  &::before,
  &::after {
    content: "${(props) => props.$char}";
    position: absolute;
    left: 0;
    top: 0;
    z-index: -1;
  }

  &::before {
    -webkit-text-stroke: 0.6rem ${(props) => props.$beforeColor || "#fff"};
  }

  &::after {
    -webkit-text-stroke: 0.3rem ${(props) => props.$afterColor || "#000"};
  }
`;
/**
 * @description 用于P5Text的块状字体
 */
export const P5BlockChar = styled.span<{
  $char?: string;
  $bgColor?: string;
  $textColor?: boolean;
  $rotate?: string;
  $innerRotate?: string;
}>`
  color: ${(props) => (props.$textColor ? P5_TOKEN_COLOR.RED : "#000")};
  -webkit-text-stroke: 0.1rem
    ${(props) => (props.$textColor ? P5_TOKEN_COLOR.RED : "#000")};
  background-color: #000;
  display: inline-block;
  padding: 0.4rem;
  border: 0.2rem solid #fff;
  overflow: hidden;
  position: relative;
  z-index: 0;
  font-weight: 300;
  line-height: 1.3;
  transform: ${(props) => props.$rotate};

  &::after {
    -webkit-text-stroke: 0.3rem #fff;
    padding: 0.2rem;
    transform: ${(props) => props.$innerRotate};
    background-color: ${(props) => props.$bgColor};
    content: "${(props) => props.$char}";
    display: inline-block;
    position: absolute;
    left: 0.2rem;
    top: 0.2rem;
    z-index: -1;
  }
`;

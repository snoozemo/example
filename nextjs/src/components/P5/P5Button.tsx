"use client";
import { P5Text } from "./";
import { styled } from "styled-components";

const P5TextButton = styled.button`
  filter: url(#outline);
  padding: 0.3rem 0.6rem;
  letter-spacing: 0.3rem;
  user-select: none;
`;
const P5NormalButton = styled.button`
  outline: none;
  border: none;
  position: relative;
  transition: all 0.3s;
  z-index: 1;
  padding: 0.6rem 2rem;
  border: 0.2rem solid #fff;
  transform: rotateY(-40deg) rotateZ(-10deg) skew(10deg, 10deg);
  & > .hover {
    display: block;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    right: 0;
    opacity: 0.2;
    z-index: -1;
  }
  &:hover > .hover:nth-last-child(3) {
    background: #00f;
    animation: 1s p5-button-hover infinite;
  }
  &:hover > .hover:nth-last-child(2) {
    background: #0f0;
    animation: 1s p5-button-hover infinite 0.2s;
  }
  &:hover > .hover:nth-last-child(1) {
    background: #f00;
    animation: 1s p5-button-hover infinite 0.4s;
  }
`;
export function P5Button({
  children,
  type = "normal",
  ...props
}: P5.P5ButtonProps) {
  const Button = type === "normal" ? P5NormalButton : P5TextButton;
  return (
    <>
      <Button {...props}>
        <P5Text>{children}</P5Text>
        <span className="hover" />
        <span className="hover" />
        <span className="hover" />
      </Button>
    </>
  );
}

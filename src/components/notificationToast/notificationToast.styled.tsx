import { device } from "@/styles";
import styled, { css, keyframes } from "styled-components";

const animationStart = keyframes`
    0% {
    -webkit-transform: translateY(0);
            transform: translateY(0);
      opacity: 0;
  }
  100% {
    -webkit-transform: translateY(-50px);
            transform: translateY(-50px);
      opacity: 1;
  }
`;

interface ToastStyledProps {
  isError: boolean;
}

export const ToastStyled = styled.div<ToastStyledProps>`
  height: 7rem;
  display: grid;
  grid-template-columns: 3.9rem 1fr 3.5rem;
  gap: 1rem;
  justify-content: center;
  align-items: center;
  border-radius: 13px;
  padding: 1rem 2rem;
  background-color: #f7f7f7;
  overflow: hidden;
  -webkit-animation: ${animationStart} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: ${animationStart} 0.5s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
  box-shadow: 0 16px 39px rgba(0, 0, 0, 0.271);
  position: absolute;
  top: 110px;
  right: -329px;
  position: fixed;
  right: 38px;
  z-index: 1000;

  ${device.phone} {
    grid-template-columns: 3.9rem 12rem 3.5rem;
    top: initial;
    bottom: 85px;
  }

  & > p:nth-child(2) {
    font-size: 1.5rem;

    ${device.phone} {
      line-height: 1.1;
    }
  }

  &::after {
    content: "";
    height: 100%;
    width: 5px;
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    background-color: var(--color-green);

    ${({ isError }) =>
      isError
        ? css`
            background-color: var(--color-red);
          `
        : css`
            background-color: var(--color-green);
          `};
  }
`;

export const ToastCheckIcon = styled.figure`
  display: block;
  opacity: 0.9;
`;

export const ToastXIcon = styled.figure`
  display: flex;
  justify-content: center;
  align-content: center;
  opacity: 0.4;
`;

export const ToastButtonX = styled.button`
  display: flex;
  margin-left: 2rem;
  justify-content: center;
  align-content: center;
`;

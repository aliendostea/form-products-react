import styled, { css, keyframes } from "styled-components";
import { device } from "@/styles";

interface CardStyledProps {
  size?: string;
}

const animationStart = keyframes`
    0% {
    -webkit-transform: translateY(20px);
            transform: translateY(20px);
      opacity: 0;
  }
  100% {
    -webkit-transform: translateY(-10px);
            transform: translateY(-10px);
      opacity: 1;
  }
`;

export const CardStyled = styled.div<CardStyledProps>`
  grid-column: 1 / 3;
  min-height: 135px;
  height: calc(100% - 6rem);
  display: grid;
  justify-self: center;
  align-self: center;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1.8rem 1rem 1.8rem 3rem;
  border-radius: 22px;
  transition: 0.25s ease-in-out;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 20px 57px hsla(0, 0%, 0%, 0.18);
  -webkit-animation: ${animationStart} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94)
    both;
  animation: ${animationStart} 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;

  ${device.phone} {
    grid-template-rows: min-content minmax(22rem, 80vh);
    padding: 1.8rem 2rem 1.8rem 2rem;
  }
  ${device.miniPhone} {
    grid-template-columns: minmax(10rem, 31rem);
    padding: 1.2rem 1.8rem 1.2rem 1.8rem;
  }

  ${({ size }) =>
    size
      ? css`
          ${device.phone} {
            grid-template-rows: min-content;
            padding: 1.8rem 2rem 1.8rem 2rem;
          }
          ${device.miniPhone} {
            padding: 1.2rem 1.8rem 1.2rem 1.8rem;
          }
        `
      : css`
          ${device.phone} {
            grid-template-rows: min-content minmax(22rem, 80vh);
            padding: 1.8rem 2rem 1.8rem 2rem;
          }
          ${device.miniPhone} {
            grid-template-columns: minmax(10rem, 31rem);
            padding: 1.2rem 1.8rem 1.2rem 1.8rem;
          }
        `}

  & > .MuiTypography-h4 {
    text-align: center;
  }
`;

export const CardSmallStyled = styled(CardStyled)`
  ${device.phone} {
    grid-template-rows: min-content 7rem;
    padding: 1.8rem 2rem 1.8rem 2rem;
  }
  ${device.miniPhone} {
    padding: 1.2rem 1.8rem 1.2rem 1.8rem;
  }
`;

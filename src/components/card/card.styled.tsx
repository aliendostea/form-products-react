import styled, { css } from "styled-components";
import { device } from "@/styles";

interface CardStyledProps {
  size?: string;
}

export const CardStyled = styled.div<CardStyledProps>`
  justify-self: center;
  grid-column: 1 / 3;
  min-height: 135px;
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;
  padding: 1.8rem 3rem 1.8rem 3rem;
  border-radius: 22px;
  transition: 0.25s ease-in-out;
  background-color: rgb(255, 255, 255);
  box-shadow: 0px 20px 57px hsla(0, 0%, 0%, 0.18);

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

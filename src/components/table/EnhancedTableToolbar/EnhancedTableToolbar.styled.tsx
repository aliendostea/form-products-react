import { ButtonStyles } from "@/components/button/Button";
import { device } from "@/styles";
import styled, { css, keyframes } from "styled-components";

export const ParentBtnEdit = styled.div`
  display: block;
  margin-right: 4rem;
`;

export const ParentBodyModal = styled.div`
  width: 38rem;
  display: grid;
  justify-content: center;
  gap: 2rem;
  text-align: center;

  ${device.phone} {
    width: initial;
  }
`;

export const ParenBtnModal = styled.div`
  display: grid;
  grid-template-columns: repeat(2, min-content);
  justify-content: space-between;
  gap: 2rem;
  margin-top: 3rem;
`;

interface BtnModalProps {
  bg: string;
  color: string;
}

export const BtnModal = styled(ButtonStyles)<BtnModalProps>`
  width: 12rem;
  padding: 18px 10px;

  ${({ bg }) =>
    bg &&
    css`
      background-color: ${bg};
    `};

  ${({ color }) =>
    color &&
    css`
      color: ${color};
    `};
`;

const rotateLoader = keyframes`
   0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

export const ButtonLoader = styled.span`
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: inline-block;
  border-top: 3px solid #fff;
  border-right: 3px solid transparent;
  box-sizing: border-box;
  animation: ${rotateLoader} 1s linear infinite;
`;

interface ParentToolbarProps {
  isItemSelected: boolean;
}

export const ParentToolbar = styled.div<ParentToolbarProps>`
  display: grid;
  grid-template-columns: 1fr 6rem 6rem;
  align-items: center;
  padding: 0 0 1rem 2rem;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  overflow: hidden;
  position: relative;

  ${device.phone} {
    padding: 0 1rem;
  }

  ${({ isItemSelected }) =>
    isItemSelected &&
    css`
      background-color: rgba(25, 118, 210, 0.12);
    `};

  & .MuiToolbar-root {
    grid-column: 3 / 4;
  }
`;
